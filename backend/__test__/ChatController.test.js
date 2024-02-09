const request = require('supertest');
const app = require('../src/app.js');
const { mangoDisconnect } = require('../src/utils/database.js');
const ChatModel = require("../src/models/chatModel.js");
jest.mock("../src/models/chatModel.js");
const ChatModelMock = require("../src/models/chatModel.js");

describe('ChatController', () => {
    afterAll(async () => {
        await mangoDisconnect();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Create chat - Success', async () => {
        const reqBody = {
            senderId: 'mockSenderId',
            receiverId: 'mockReceiverId'
        };

        const mockChat = {
            _id: 'mockChatId',
            members: [reqBody.senderId, reqBody.receiverId],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        ChatModelMock.prototype.save.mockResolvedValue(mockChat);

        const response = await request(app)
            .post('/api/chat')
            .send(reqBody);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockChat);
    });

    test('Create chat - Error case', async () => {
        const reqBody = {
            senderId: 'mockSenderId',
            receiverId: 'mockReceiverId'
        };

        const errorMessage = 'Error saving chat';
        ChatModelMock.prototype.save.mockRejectedValue(new Error(errorMessage));

        const response = await request(app)
            .post('/api/chat')
            .send(reqBody);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: errorMessage });
    });

    test('Get user chats - No chats found', async () => {
        const mockUserId = 'mockUserId';

        ChatModelMock.find.mockResolvedValue([]);

        const response = await request(app)
            .get(`/api/chat/${mockUserId}`);

        expect(response.status).toBe(200);
        expect(ChatModelMock.find).toHaveBeenCalledTimes(1);
        expect(ChatModelMock.find).toHaveBeenCalledWith({
            members: { $in: [mockUserId] }
        });
        expect(response.body).toEqual([]);
    });

    test('Get user chats - Error case', async () => {
        const mockUserId = 'mockUserId';
        const errorMessage = 'Error finding chats';
        ChatModelMock.find.mockRejectedValue(new Error(errorMessage));

        const response = await request(app)
            .get(`/api/chat/${mockUserId}`);

        expect(response.status).toBe(500);
        expect(ChatModelMock.find).toHaveBeenCalledTimes(1);
        expect(ChatModelMock.find).toHaveBeenCalledWith({
            members: { $in: [mockUserId] }
        });
        expect(response.body).toEqual({ message: errorMessage });
    });

    test('Find chat between users - No chat found', async () => {
        const firstId = 'firstId';
        const secondId = 'secondId';

        ChatModelMock.findOne.mockResolvedValue(null);

        const response = await request(app)
            .get(`/api/chat/find/${firstId}/${secondId}`);

        expect(response.status).toBe(404);
        expect(ChatModelMock.findOne).toHaveBeenCalledTimes(1);
        expect(ChatModelMock.findOne).toHaveBeenCalledWith({
            members: { $all: [firstId, secondId] }
        });
        expect(response.body).toEqual({ message: 'Chat not found' });
    });

    test('Find chat between users - Error case', async () => {
        const firstId = 'firstId';
        const secondId = 'secondId';
        const errorMessage = 'Error finding chat';
        ChatModelMock.findOne.mockRejectedValue(new Error(errorMessage));

        const response = await request(app)
            .get(`/api/chat/find/${firstId}/${secondId}`);

        expect(response.status).toBe(500);
        expect(ChatModelMock.findOne).toHaveBeenCalledTimes(1);
        expect(ChatModelMock.findOne).toHaveBeenCalledWith({
            members: { $all: [firstId, secondId] }
        });
        expect(response.body).toEqual({ message: errorMessage });
    });

    // Add more test cases as needed
});
