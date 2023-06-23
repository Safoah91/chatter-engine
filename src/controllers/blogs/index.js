const BlogsModel = require("../../database/models/blogs");
const asyncHandler = require("express-async-handler");

const blogs = asyncHandler(async (req, res) => {
  const blogs = await BlogsModel.find({});
  res.status(200).json(blogs);
});

/**
 *
 */
const createBlog = asyncHandler(async (req, res) => {
  const createNewBlog = await BlogsModel.create({
    ...req.body,
  });

  if (createNewBlog) {
    res.status(201).json({ message: "blog create successfully" });
  } else {
    res.status(401);
    throw new Error("Unable to create blog");
  }
});

module.exports = { blogs, createBlog };
