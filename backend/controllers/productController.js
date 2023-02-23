const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

//Create a product --Admin
const createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  return res.status(201).json({
    success: true,
    product: product,
  });
});

//Get All Products
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;

  let apiFeature = new ApiFeatures(Product.find(), req.query).search().filter();

  let products = await apiFeature.query;
  let productsCount = products.length;
  apiFeature = apiFeature.pagination(resultPerPage);
  products = await apiFeature.query;
  // console.log(122121, productsCount, products);
  return res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
  });
});

//Get a Single Product
const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  return res.status(200).json({
    success: true,
    product,
  });
});

//Update a Product -- Admin
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: "false",
      message: "Product not Found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(200).json({
    success: true,
    product: product,
  });
});

//Delete a Product -- Admin
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not Found",
    });
  }
  product.remove();
  return res.status(200).json({
    success: true,
    product: product,
    message: "Product deleted Successfully",
  });
});

//Create New Review or Update the Review
const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    for (let rev of product.reviews) {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
        break;
      }
    }
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  product.ratings =
    product.reviews.reduce((acc, rev) => (acc += rev.rating), 0) /
    product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//Get Product Reviews
const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  return res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Review
const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const { productId, id } = req.query;
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const restOfTheReviews = product.reviews.filter(
    (rev) => rev._id.toString() !== id.toString()
  );
  const newRatings =
    restOfTheReviews.reduce((acc, rev) => (acc += rev.rating), 0) /
    restOfTheReviews.length;

  await Product.findByIdAndUpdate(productId, {
    numOfReviews: restOfTheReviews.length,
    ratings: newRatings,
    reviews: restOfTheReviews,
  });

  return res.status(200).json({
    success: true,
    message: "Review deleted Successfully",
  });
});

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
};
