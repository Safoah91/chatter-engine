const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../../controllers/users");
const verifyToken = require("../../middleware/verifyToken");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.get("/current", verifyToken, currentUser);

const UserRoutes = router;
module.exports = UserRoutes;
