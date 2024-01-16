const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;
mongoose.connection.once('open', () => {
  console.log('MongoDB connection is ready...');
});
mongoose.connection.on('erro', (err) => {
  console.error(`something went wrong ${err}`);
});

const mangoConnect = async () => {
  mongoose.connect(
    'mongodb+srv://mohyus20:mohyus20@cluster0.imnu8ez.mongodb.net/Webutvikling?retryWrites=true&w=majority'
  );
  mongoose.set('strictQuery', true);
};

const mangoDidsconnect = async () => {
  await mongoose.disconnect();
};

module.exports = {
  mangoConnect,
  mangoDidsconnect,
};
