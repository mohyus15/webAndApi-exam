const request = require('supertest');
const app = require('../src/app.js');
const bcrypt = require('bcryptjs'); 
const { mongooseConnect, mongooseDisconnect } = require('../src/utils/database.js');

describe('Test CRUD operations for /api/messages', () => {
    beforeAll(async () => {
        await mongooseConnect();
    });

    afterAll(async () => {
        await mongooseDisconnect();
    });
    let userId; 

    const userData = {
        name: 'Test User1',
        email: 'testuser1@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    };
    const userDataWithOutData = {
      name: 'Test User',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: false,
  };

  test('Create a new user - POST /api/users', async () => {
    const response = await request(app)
        .post('/api/users')
        .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    userId = response.body._id;
});
  test('Create a new user with incomplete data - POST /api/users', async () => {
    const response = await request(app)
        .post('/api/users')
        .send(userDataWithOutData);

    expect(response.status).toBe(400);
});
    

    test('Get all users - GET /api/users', async () => {
        const response = await request(app)
            .get('/api/users');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });


    test('Create a new user with incomplete data - POST /api/users', async () => {
        const response = await request(app)
            .post('/api/users')
            .send(userDataWithOutData);
    
        expect(response.status).toBe(400);
    });

    

    
    test('Delete a user - DELETE /api/users/:id', async () => {
        const response = await request(app)
            .delete(`/api/users/${userId}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toBe('User deleted successfully');
    });

});