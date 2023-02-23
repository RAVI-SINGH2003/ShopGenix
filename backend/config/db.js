const mongoose = require("mongoose");

const connectDB = async() => {
 await mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology:true
    })
    .then((data) => {
      console.log(`Mongodb connected with server : ${data.connection.host}`);
    })
};

module.exports = connectDB;
