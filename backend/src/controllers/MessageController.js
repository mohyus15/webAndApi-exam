const MessageModel = require("../models/messageModel");

const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  try {
    const result = await MessageModel.create({
      chatId,
      senderId,
      text,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await MessageModel.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addMessage,
  getMessages,
};
