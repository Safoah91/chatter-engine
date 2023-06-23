const { blogs, createBlog } = require("../../controllers/blogs");

const express = require("express");
const router = express.Router();

router.route("/").get(blogs);
router.route("/create").post(createBlog);

const blogRoutes = router;
module.exports = blogRoutes;
