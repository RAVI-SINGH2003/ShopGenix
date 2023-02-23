const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//To check if user is Logged In
exports.isUserLoggedIn = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decodedData) { id: '639d90f20c416e407c14dc15', iat: 1671275658, exp: 1671707658 }

  req.user = await User.findById(decodedData.id);
  next();
});

//To check if user is Admin
exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role : ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

// Notes :
//  a client is forbidden from accessing a valid URL. The server understands the request, but it can't fulfill the request because of client-side issues.
