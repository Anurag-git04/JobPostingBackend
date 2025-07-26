const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo DB is connected");
  } catch (error) {
    console.log("Error while connecting DB", error);
    process.exit(1);
  }
};

module.exports = connectDB;
