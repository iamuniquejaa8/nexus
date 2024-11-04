const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://kunallamba:mzX3HxIJan7c5RhJ@cluster0.izzly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToDB = () => new Promise(async (resolve, reject) => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);

    resolve({
      message: "Connected to database",
      connection: conn
    });
  } catch (error) {
    reject({
      message: error.message
    });
  }
});

module.exports = connectToDB;