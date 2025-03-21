/** @format */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const productsData = require("./data/productsData");
const Cart = require("./models/Cart");


dotenv.config();

//connect mongodb
mongoose.connect(process.env.MONGODB_URI);

//function to seed  data

const seedData = async () => {
  try {
    //clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    await Cart.deleteMany({});
    //create new admin user
    const createdUser = await User.create({
      name: "Admin user",
      email: "admin@example.com",
      password: "12345678",
      role: "admin",
    });
    //assign defualt user id to each product
    const userId = createdUser._id;

    const sampleProducts = productsData.map((product) => {
      return { ...product, user: userId };
    });
    //insert product into databae
    await Product.insertMany(sampleProducts);
    console.log("Data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
