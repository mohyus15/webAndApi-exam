const seederUsers = require("./seedData/users.js");
const { seederNews } = require("./seedData/news.js");

const { mongooseConnect } = require("./utils/database.js");
const dotenv = require("dotenv").config();

const Product = require("./models/newsModels.js");
const User = require("./models/usersModel.js");

const importData = async () => {
  try {
    await mongooseConnect();

    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(seederUsers);

    const adminUser = createdUsers[0].id;

    const sampleNews = seederNews.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleNews);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await mongooseConnect();

    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Delete!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
