const seederUsers = require("./seedData/users.js");
const { seederProducts } = require("./seedData/product.js");

const { mangoConnect } = require("./utils/database.js");
const dotenv = require("dotenv").config();

const Product = require("./models/productModels.js");
const User = require("./models/usersModel.js");

const importData = async () => {
  try {
    await mangoConnect();

    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(seederUsers);

    const adminUser = createdUsers[0].id;

    const sampleProducts = seederProducts.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await mangoConnect();

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
