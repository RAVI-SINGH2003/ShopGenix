const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));
app.use(fileUpload());

//Router Imports
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
