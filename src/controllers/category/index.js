const asyncHandler = require("express-async-handler");
const CategoryModel = require("../../database/models/category");

/**
 *
 */
const categories = asyncHandler(async (req, res) => {
  const category = await CategoryModel.find({});
  res.status(200).json({ category });
});

const createCategory = asyncHandler(async (req, res) => {
  const newCategory = await CategoryModel.create({
    ...req.body,
  });

  if (newCategory) {
    res.status(201).json({ message: "category created successfully" });
  } else {
    res.status(401);
    throw new Error("Unable to create category");
  }
});

module.exports = { categories, createCategory };
