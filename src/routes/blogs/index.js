const { blogs, createBlog, publishedBlogs, draftedBlogs, userBlogs } = require("../../controllers/blogs");

const express = require("express");
const verifyToken = require("../../middleware/verifyToken");
const router = express.Router();

router.route("/").get(blogs);
router.route("/published").get(publishedBlogs);
router.get("/user-drafted-blogs", verifyToken, draftedBlogs);
router.get("/user-blogs", verifyToken, userBlogs);
router.post("/create", verifyToken, createBlog);

const blogRoutes = router;
module.exports = blogRoutes;
