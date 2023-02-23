const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isUserLoggedIn, authorizedRoles } = require("../middleware/auth.js");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isUserLoggedIn, getUserDetails);
router.route("/password/update").put(isUserLoggedIn, updatePassword);
router.route("/me/update").put(isUserLoggedIn, updateProfile);
router
  .route("/admin/users")
  .get(isUserLoggedIn, authorizedRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isUserLoggedIn, authorizedRoles("admin"), getSingleUser)
  .put(isUserLoggedIn, authorizedRoles("admin"), updateUserRole)
  .delete(isUserLoggedIn, authorizedRoles("admin"), deleteUser)
module.exports = router;
