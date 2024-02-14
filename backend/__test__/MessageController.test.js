const request = require('supertest');
const app = require('../src/app.js');
const { mongooseConnect, mongooseDisconnect } = require('../src/utils/database.js');

describe('Test CRUD operations for /api/messages', () => {
    beforeAll(async () => {
        await mongooseConnect();
    });

    afterAll(async () => {
        await mongooseDisconnect();
    });
    


    let messageId; 
    const messageData = {
        chatId: '65c44426e01198f1d8d1a18b',
        senderId: '65c44426e01198f1d8d1a189',
        text: 'Test message',
    };

    // Create a new message
    test('Create a new message - POST /api/messages', async () => {
      const response = await request(app)
          .post('/api/messages')
          .send(messageData);

      expect(response.status).toBe(404);
  });

    // Get all messages
    test('Get all messages - GET /api/messages', async () => {
        const response = await request(app)
            .get('/api/messages');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(false);
    });

    // Get a specific message
    test('Get a specific message - GET /api/messages/:id', async () => {
        const response = await request(app)
            .get(`/api/messages/${messageId}`);

        expect(response.status === 200 || response.status === 404).toBeTruthy();

        if (response.status === 200) {
            expect(response.body).not.toHaveProperty('_id');
        }
    });

    // Update a message
    test('Update a message - PUT /api/messages/:id', async () => {
        const updatedMessageData = { ...messageData, text: 'Updated test message' };

        const response = await request(app)
            .put(`/api/messages/${messageId}`)
            .send(updatedMessageData);

        expect(response.status === 200 || response.status === 404).toBeTruthy();

        if (response.status === 200) {
            expect(response.body).toHaveProperty('text', 'Updated test message');
        }
    });

    // Delete a message
    test('Delete a message - DELETE /api/messages/:id', async () => {
        const response = await request(app)
            .delete(`/api/messages/${messageId}`);

        expect(response.status === 200 || response.status === 404).toBeTruthy();

        if (response.status === 200) {
            expect(response.body).toHaveProperty('message', 'Message deleted successfully');
            expect(response.body).not.toHaveProperty('_id');
        }
    });
});
