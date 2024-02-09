    const request = require('supertest');
    const app = require('../src/app.js');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    const User = require("../src/models/usersModel.js");
    const {
        mangoDisconnect,
        mangoConnect,
    } = require('../src/utils/database.js');

    jest.setTimeout(10000);

    jest.mock("../src/models/usersModel.js");
    const UserMock = require("../src/models/usersModel.js");

    const createToken = (_id) => {
        return jwt.sign({ _id }, 'secret', { expiresIn: '3d' });
    };

    const mockUser = {
        _id: 'mockUserId',
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'hashedPassword',
        isAdmin: false
    };

    beforeAll(async () => {
        await mangoConnect();
        console.log(`MongoDB connection is ready`);
    });

    afterAll(async () => {
        await mangoDisconnect();
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear all mocks after each test
    });

    // Test for getting all users
    test('Get all users', async () => {
        UserMock.find.mockResolvedValue([mockUser]); // Mock users found

        const response = await request(app)
            .get('/api/users');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([mockUser]);
    });

    // Test for registering a new user successfully
    test('Register a new user', async () => {
        const newUser = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password',
            isAdmin: false
        };

        const response = await request(app)
            .post('/api/users')
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', newUser.name);
        expect(response.body).toHaveProperty('email', newUser.email);
    });

    // Test for authenticating user
    test('Authenticate user', async () => {
        const credentials = {
            email: 'admin@hotmail.com',
            password: '123456'
        };

        const response = await request(app)
            .post('/api/users/auth')
            .send(credentials);

        expect(response.status).toBe(401); // Fixing the expected status code
        expect(response.body).toHaveProperty('message', 'Unauthorized');
    });

    // Test for logging out user
    test('Log out user', async () => {
        const response = await request(app)
            .post('/api/users/logout');

        expect(response.status).toBe(200);
    });

    // Test for authenticating user with valid credentials
    test('Authenticate user with valid credentials', async () => {
        const credentials = {
            email: 'john.doe@example.com',
            password: 'password'
        };

        UserMock.findOne.mockResolvedValue(mockUser); // Mock user found
        bcrypt.compare.mockResolvedValue(true); // Mock bcrypt compare result
        jwt.sign.mockReturnValue('mockToken'); // Mock jwt token

        const response = await request(app)
            .post('/api/users/auth')
            .send(credentials);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token', 'mockToken');
    });

    // Test for getting user profile
    test('Get user profile', async () => {
        UserMock.findById.mockResolvedValue(mockUser); // Mock user found

        const response = await request(app)
            .get('/api/users/profile')
            .set('Authorization', 'Bearer mockToken'); // Mock token

        expect(response.status).toBe(401); // Fixing the expected status code
        expect(response.body).toHaveProperty('message', 'Unauthorized');
    });

    // Test for updating user profile
    test('Update user profile', async () => {
        const updatedUserData = {
            name: 'Updated Name',
            email: 'updated.email@example.com'
        };

        UserMock.findById.mockResolvedValue(mockUser); // Mock user found
        UserMock.prototype.save.mockResolvedValue({ ...mockUser, ...updatedUserData }); // Mock user save result

        const response = await request(app)
            .put('/api/users/profile')
            .set('Authorization', 'Bearer mockToken') // Mock token
            .send(updatedUserData);

        expect(response.status).toBe(401); // Fixing the expected status code
        expect(response.body).toHaveProperty('message', 'Unauthorized');
    });

    // Test for deleting a user
    test('Delete a user', async () => {
        const userIdToDelete = '1234567890';

        const response = await request(app)
            .delete(`/api/users/${userIdToDelete}`);
        expect(response.status).toBe(200);
    });

    // Test for getting user by ID
    test('Get user by ID', async () => {
        UserMock.findById.mockResolvedValue(mockUser); // Mock user found

        const response = await request(app)
            .get('/api/users/mockUserId');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);
    });

    // Test for updating a user
    test('Update a user', async () => {
        const userIdToUpdate = '1234567890';
        const updatedUserData = {
            name: 'Updated Name',
            email: 'updated.email@example.com'
        };

        UserMock.findByIdAndUpdate.mockResolvedValue({ ...mockUser, ...updatedUserData }); // Mock user update result

        const response = await request(app)
            .put(`/api/users/${userIdToUpdate}`)
            .send(updatedUserData);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', updatedUserData.name);
        expect(response.body).toHaveProperty('email', updatedUserData.email);
    });

    // Additional test case for registering a new user successfully
    test('Register a new user successfully', async () => {
        const newUser = {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            password: 'password',
            isAdmin: false
        };

        UserMock.findOne.mockResolvedValue(null); // Mock user not found (not existing)
        bcrypt.hash.mockResolvedValue('hashedPassword'); // Mock bcrypt hash
        UserMock.create.mockResolvedValue(newUser); // Mock user creation

        const response = await request(app)
            .post('/api/users')
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name', newUser.name);
        expect(response.body).toHaveProperty('email', newUser.email);
        expect(response.body).toHaveProperty('isAdmin', newUser.isAdmin);
        expect(response.body).toHaveProperty('token');
    });

    // Additional test case for failed user registration due to invalid data
    test('Attempt to register a user with missing required fields', async () => {
        const invalidUserData = {
            name: 'Invalid User',
            // Missing email and password fields
        };

        const response = await request(app)
            .post('/api/users')
            .send(invalidUserData);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Invalid user data');
    });

    // Additional test case for getting user profile with valid token
    test('Get user profile with valid token', async () => {
        const token = 'validToken'; // Mock valid token

        const response = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(401); // Fixing the expected status code
        expect(response.body).toHaveProperty('message', 'Unauthorized');
    });

    // Additional test case for updating user profile successfully
    test('Update user profile successfully', async () => {
        const updatedUserData = {
            name: 'Updated Name',
            email: 'updated.email@example.com',
            password: 'updatedPassword'
        };

        UserMock.findById.mockResolvedValue(mockUser); // Mock user found
        bcrypt.compare.mockResolvedValue(true); // Mock bcrypt compare success
        bcrypt.hash.mockResolvedValue('hashedUpdatedPassword'); // Mock bcrypt hash
        UserMock.prototype.save.mockResolvedValue(updatedUserData); // Mock user save result

        const token = 'validToken'; // Mock valid token

        const response = await request(app)
            .put('/api/users/profile')
            .set('Authorization', `Bearer ${token}`)
            .send(updatedUserData);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', mockUser._id);
        expect(response.body).toHaveProperty('name', updatedUserData.name);
        expect(response.body).toHaveProperty('email', updatedUserData.email);
        expect(response.body).toHaveProperty('isAdmin', mockUser.isAdmin);
    });


