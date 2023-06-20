const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const connectDB = asyncHandler(async () => {
  const connect = await mongoose.connect(process.env.MONGO_DB_URI);

  console.log(`- ${connect.connection.name} database connected`);
});

module.exports = connectDB;
