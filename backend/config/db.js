const mongoose = require("mongoose");


//connect to the database
const connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // log the connection host
    console.log(
      `MongoDB has started on: ${conn.connection.host}`.green.underline
    );
  } catch (error) {
    console.log(error.reason);
    process.exit(1);
  }
};

module.exports = connection;
