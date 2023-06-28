const { blogs, singleBlog, singleUserBlog, createBlog, publishedBlogs, draftedBlogs, userBlogs, updateBlog } = require("../../controllers/blogs");

const express = require("express");
const verifyToken = require("../../middleware/verifyToken");
const router = express.Router();

router.route("/").get(blogs);
router.route("/blog/").get(singleBlog);
router.route("/published").get(publishedBlogs);
router.get("/user-drafted-blogs", verifyToken, draftedBlogs);
router.get("/user-blogs", verifyToken, userBlogs);
router.get("/user-blogs/blog/", verifyToken, singleUserBlog);
router.post("/blog/create", verifyToken, createBlog);
router.put("/blog/update/", verifyToken, updateBlog);

const blogRoutes = router;
module.exports = blogRoutes;
