const app = require("./app.js");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary")
const connectDB = require("./config/db");

//Handling Uncaught Exception
process.on("uncaughtException",err=>{
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to uncaught Exception`);
  process.exit(1);
})

//config
dotenv.config({path:"backend/config/config.env"});

//Connecting to database
connectDB();

cloudinary.config({
  cloud_name : process.env.CLOUDINARY_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET,
})

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});

//Unhandled Promise Rejection
//process is a global Nodejs object
process.on("unhandledRejection",(err)=>{
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise Rejection`);
  server.close(()=>{
    process.exit(1);
  })
})