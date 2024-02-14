const request = require('supertest');
const app = require('../src/app.js');
const { mangoDisconnect, mangoConnect } = require('../src/utils/database.js');

describe('Test CRUD operations for /api/chats', () => {
    beforeAll(async () => {
        await mangoConnect();
    });

    afterAll(async () => {
        await mangoDisconnect();
    });

    let chatId;

    const chatData = {
        senderId: '65c44426e01198f1d8d1a189',
        receiverId: '65c44426e01198f1d8d1a18b',
    };

    // Add a new chat
    test('Add a new chat - POST /api/chats', async () => {
        const response = await request(app)
            .post('/api/chats')
            .send(chatData);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('_id');
        chatId = response.body._id;
    });

    // Get all chats for a user
    test('Get all chats for a user - GET /api/chats/:userId', async () => {
        const response = await request(app)
            .get(`/api/chats/${chatData.senderId}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Find a specific chat between two users
    test('Find a specific chat between two users - GET /api/chats/:firstId/:secondId', async () => {
        const response = await request(app)
            .get(`/api/chats/${chatData.senderId}/${chatData.receiverId}`);

        expect(response.status === 200 || response.status === 404).toBeTruthy();

        if (response.status === 200) {
            expect(response.body).toHaveProperty('_id', chatId);
        }
    });

    // Delete a specific chat
    test('Delete a specific chat - DELETE /api/chats/:id', async () => {
        const response = await request(app)
            .delete(`/api/chats/${chatId}`);

        expect(response.status === 200 || response.status === 404).toBeTruthy();

        if (response.status === 200) {
            expect(response.body).toHaveProperty('message', 'Chat deleted successfully');
            expect(response.body).not.toHaveProperty('_id');
        }
    });
});

