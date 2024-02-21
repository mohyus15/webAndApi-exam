const mongoose = require('mongoose');

const mongo_url = process.env.mongo_url;
mongoose.connection.once('open', async () => {
    console.log('MongoDB connection is ready');
});
mongoose.connection.on('error', async err => {
    console.error(`Something went wrong ${err}`);
});

const mongooseConnect = async () => {
    await mongoose.connect("mongodb+srv://mohyus20:OGH2RHHNWhlZXHeQ@db.6tlp7p3.mongodb.net/webAndApi?retryWrites=true&w=majority");

    
    mongoose.set('strictQuery', true);
};

const mongooseDisconnect = async () => {
    await mongoose.disconnect();
};

module.exports = {
    mongooseConnect,
    mongooseDisconnect,
};
