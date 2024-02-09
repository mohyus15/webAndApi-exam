const request = require('supertest');
const app = require('../src/app.js');
const { mangoDisconnect } = require('../src/utils/database.js');
const MessageModel = require("../src/models/messageModel.js");

jest.mock("../src/models/messageModel.js");
const MessageModelMock = require("../src/models/messageModel.js");

describe('MessageController', () => {
    afterAll(async () => {
        await mangoDisconnect();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Add message - Success', async () => {
        const reqBody = {
            chatId: 'mockChatId',
            senderId: 'mockSenderId',
            text: 'Hello, how are you?'
        };

        const mockMessage = {
            _id: 'mockMessageId',
            chatId: reqBody.chatId,
            senderId: reqBody.senderId,
            text: reqBody.text,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        MessageModelMock.create.mockResolvedValue(mockMessage);

        const response = await request(app)
            .post('/api/message')
            .send(reqBody);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockMessage);
    });

    test('Add message - Error case', async () => {
        const reqBody = {
            chatId: 'mockChatId',
            senderId: 'mockSenderId',
            text: 'Hello, how are you?'
        };

        const errorMessage = 'Error saving message';
        MessageModelMock.create.mockRejectedValue(new Error(errorMessage));

        const response = await request(app)
            .post('/api/message')
            .send(reqBody);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: errorMessage });
    });

    test('Get messages - Success', async () => {
        const mockChatId = 'mockChatId';
        const mockMessages = [
            { _id: '1', chatId: mockChatId, senderId: 'sender1', text: 'Message 1' },
            { _id: '2', chatId: mockChatId, senderId: 'sender2', text: 'Message 2' }
        ];

        MessageModelMock.find.mockResolvedValue(mockMessages);

        const response = await request(app)
            .get(`/api/message/${mockChatId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockMessages);
    });

    test('Get messages - Error case', async () => {
        const mockChatId = 'mockChatId';
        const errorMessage = 'Error fetching messages';
        MessageModelMock.find.mockRejectedValue(new Error(errorMessage));

        const response = await request(app)
            .get(`/api/message/${mockChatId}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: errorMessage });
    });
});
