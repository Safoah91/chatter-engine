const express = require("express");
const router = express.Router();
const { categories, createCategory } = require("../../controllers/category");

router.route("/").get(categories);
router.route("/create").post(createCategory);

const categoryRoutes = router;
module.exports = categoryRoutes;
