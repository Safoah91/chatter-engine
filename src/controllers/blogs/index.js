const BlogsModel = require("../../database/models/blogs");
const asyncHandler = require("express-async-handler");

const blogs = asyncHandler(async (req, res) => {
  const blogs = await BlogsModel.find({});
  res.status(200).json(blogs);
});


/**
 *
 */
const publishedBlogs = asyncHandler(async (req, res) => {
  const published = await BlogsModel.find({ isPublished: true});

  if (published) {
    res.status(200).json(published);
  } else {
    res.status(401);
    throw new Error("No published blogs");
  }
});

const userBlogs = asyncHandler(async (req, res) => {
  const user = req.user.id

  const {userID} = req.query

  if(!user) {
    res.status(402)
    throw new Error('Token not provided or invalid')
  }

  console.log(userID)

  const blogs = await BlogsModel.find({userID: user});

  if(blogs) {
    res.status(200).json(blogs);
  } else {
    res.status(401)
    throw new Error('User has no blogs created')
  }
});


/**
 *
 */
const draftedBlogs = asyncHandler(async (req, res) => {
  const user = req.user.id
  
  if(!user) {
    res.status(402)
    throw new Error('Token not provided or invalid')
  }

  const drafted = await BlogsModel.find({userID: user, isDrafted: true});

  if (drafted) {
    res.status(200).json(drafted);
  } else {
    res.status(401);
    throw new Error("No drafted blogs");
  }
});

/**
 *
 */
const createBlog = asyncHandler(async (req, res) => {
  const user = req.user.id
    
    if(!user) {
      res.status(402)
      throw new Error('Token not provided or invalid')
    }
  
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

module.exports = { blogs, createBlog, publishedBlogs, draftedBlogs, userBlogs };
