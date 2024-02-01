const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;
const NODE_ENV = process.env.NODE_ENV || 'production';

mongoose.connection.once('open', () => {
  console.log(`MongoDB connection is ready`);

});
mongoose.connection.on('erro', (err) => {
  console.error(`something went wrong ${err}`);
});

const mangoConnect = async () => {
  mongoose.connect('mongodb+srv://mohyus20:OGH2RHHNWhlZXHeQ@db.6tlp7p3.mongodb.net/webAndApi?retryWrites=true&w=majority'
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
