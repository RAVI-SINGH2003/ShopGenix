const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isUserLoggedIn, authorizedRoles } = require("../middleware/auth.js");

//one can view products even without login
router.route("/products").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(isUserLoggedIn, authorizedRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isUserLoggedIn, authorizedRoles("admin"), updateProduct)
  .delete(isUserLoggedIn, authorizedRoles("admin"), deleteProduct);

//one can view a product even without login
router.route("/product/:id").get(getSingleProduct);

router.route("/review").put(isUserLoggedIn, createProductReview);

//one can view reviews even without login
router.route("/reviews").get(getProductReviews).delete(isUserLoggedIn,deleteReview);
module.exports = router;
