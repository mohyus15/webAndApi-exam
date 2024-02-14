const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;
mongoose.connection.once('open', async () => {
    console.log('MongoDB connection is ready');
});
mongoose.connection.on('error', async err => {
    console.error(`Something went wrong ${err}`);
});

const mongooseConnect = async () => {
    await mongoose.connect(
        'mongodb+srv://webandapi:webandapi@cluster0.rzbtnrs.mongodb.net/exam?retryWrites=true&w=majority'
    );

    mongoose.set('strictQuery', true);
};

const mongooseDisconnect = async () => {
    await mongoose.disconnect();
};

module.exports = {
    mongooseConnect,
    mongooseDisconnect,
};
