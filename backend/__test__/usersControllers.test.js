const request = require('supertest');
const app = require('../src/app.js');
const bcrypt = require('bcryptjs'); 

const {
    mangoDidsconnect,
    mangoConnect,
} = require('../src/utils/database.js');

describe('Test CRUD operations for /api/users', () => {
    beforeAll(async () => {
        await mangoConnect();
    });

    afterAll(async () => {
        await mangoDidsconnect();
    });

    let userId; 

    const userData = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    };
    const userDataWithOutData = {
      name: 'Test User',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: false,
  };
  test('Create a new user with incomplete data - POST /api/users', async () => {
    const response = await request(app)
        .post('/api/users')
        .send(userDataWithOutData);

    expect(response.status).toBe(500); // Assuming server responds with 500 for missing data
});
    test('Create a new user - POST /api/users', async () => {
        const response = await request(app)
            .post('/api/users')
            .send(userData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        userId = response.body._id; // Store the ID of the created user
    });

    test('Get all users - GET /api/users', async () => {
        const response = await request(app)
            .get('/api/users');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('Get a specific user - GET /api/users/:id', async () => {
        const response = await request(app)
            .get(`/api/users/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', userId);
    });

    test('Update a user - PUT /api/users/:id', async () => {
        const updatedUserData = { ...userData, name: 'Updated User' };

        const response = await request(app)
            .put(`/api/users/${userId}`)
            .send(updatedUserData);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Updated User');
    });

    test('Delete a user - DELETE /api/users/:id', async () => {
      const response = await request(app)
          .delete(`/api/users/${userId}`);
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'User deleted successfully');

      expect(response.body).not.toHaveProperty('_id');
  });
  ;
});
