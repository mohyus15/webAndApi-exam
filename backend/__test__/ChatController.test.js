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

    let chatId;

    const chatData = {
        senderId: '65c44426e01198f1d8d1a189',
        receiverId: '65c44426e01198f1d8d1a18b',
    };


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

