const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isUserLoggedIn, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/order/new").post(isUserLoggedIn, newOrder);
router.route("/order/:id").get(isUserLoggedIn, getSingleOrder);
router.route("/orders/me").get(isUserLoggedIn, myOrders);
router
  .route("/admin/orders")
  .get(isUserLoggedIn, authorizedRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isUserLoggedIn, authorizedRoles("admin"), updateOrder)
  .delete(isUserLoggedIn, authorizedRoles("admin"), deleteOrder);
  
module.exports = router;
