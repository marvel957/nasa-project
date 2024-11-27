const mongoose = require("mongoose");
// const db_URI = process.env.MONGO_URL;
const db_URI = "mongodb://127.0.0.1:27017/nasa";

// const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/nasa';

async function connectMongo() {
  try {
    await mongoose.connect(db_URI);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

async function disconnectMongo() {
  await mongoose.disconnect();
  console.log("MongoDB disconnected!");
}

module.exports = { connectMongo, disconnectMongo };
