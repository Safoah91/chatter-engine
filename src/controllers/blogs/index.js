const BlogsModel = require("../../database/models/blogs");
const asyncHandler = require("express-async-handler");

/**
 * @description Get All Blogs
 * @route GET /api/blogs
 * @access Public
 */
const blogs = asyncHandler(async (req, res) => {
  const blogs = await BlogsModel.find({isPublished: true});
  res.status(200).json(blogs);
});

/**
 * @description Get Single Blog
 * @route GET /api/blogs/blog/:id
 * @access Public
 */
const singleBlog = asyncHandler(async(req, res) => {
  const blogID = req.query.id;
  
  if(!blogID) {
    res.status(404)
    throw new Error('Blog ID not provided')
  }

  const blog = await BlogsModel.findOne({_id: blogID})

  if(blog) {
    res.status(200).json(blog)  
  } else {
    res.status(400)
    throw new Error('Blog not found')
  }
})

/**
 * @description Get All User Blogs
 * @route GET /api/blogs/user-blogs
 * @access Private
 */
const userBlogs = asyncHandler(async (req, res) => {
  const user = req.user.id

  if(!user) {
    res.status(401)
    throw new Error('Token not provided or invalid')
  }

  const blogs = await BlogsModel.find({userID: user});

  if(blogs) {
    res.status(200).json(blogs);
  } else {
    res.status(401)
    throw new Error('User has no blogs created')
  }
});

/**
 * @description Get Single User Blog
 * @route GET /api/blogs/user-blogs/blog/:id
 * @access Private
 */
const singleUserBlog = asyncHandler(async(req, res) => {
  const userID = req.user.id
  const blogID = req?.query?.id

  if(!userID) {
    res.status(402)
    throw new Error('Token not provided or invalid')
  }

  if(!blogID) {
    res.status(404)
    throw new Error('Blog ID not provided')
  }

  const blog = await BlogsModel.findOne({_id: blogID, userID: userID, });

  if(blog) {
    res.status(200).json(blog);
  } else {
    res.status(401)
    throw new Error('Could not fetch single user blog')
  }
})

/**
 * @description Get All Blogs
 * @route GET /api/blogs
 * @access Public
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

/**
 *
 */
const updateBlog = asyncHandler(async (req, res) => {
  const user = req.user.id
  // const {id: blogID} = req.params
  const blogID = req?.query?.id
  const blog = await BlogsModel.findOne({_id: blogID})
    
    if(!user) {
      res.status(402)
      throw new Error('Token not provided or invalid')
    }

    if(!blogID) {
      res.status(404)
      throw new Error("Blog ID not provided")
    }
  
    const updateNewBlog = await BlogsModel.findByIdAndUpdate({_id: blogID, new: true});
  
    if (updateNewBlog) {
      res.status(202).json({ message: "blog updated successfully" });
    } else {
      res.status(401);
      throw new Error("Unable to update blog");
    }
  });

module.exports = { blogs, singleBlog, singleUserBlog, createBlog, publishedBlogs, draftedBlogs, userBlogs, updateBlog };
