const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../../controllers/users");
const verifyToken = require("../../middleware/verifyToken");

router.route("/auth/register").post(registerUser);
router.route("/auth/login").post(loginUser);
router.get("/auth/current", verifyToken, currentUser);

const UserRoutes = router;
module.exports = UserRoutes;
