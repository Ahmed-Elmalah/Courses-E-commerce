const categories = require("../models/categoryModel");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");

const getAllCategories = asyncHandler(async (req, res, next) => {
  res.json({
    status: "success",
    results: categories.length,
    data: { categories },
  });
});

const addCategory = asyncHandler(async (req, res, next) => {
  if (!req.body.name) {
    return next(new AppError("Category name is required", 400));
  }

  const newCategory = {
    id: req.body.id || categories.length + 1,
    name: req.body.name,
  };

  categories.push(newCategory);

  res.status(201).json({
    status: "success",
    data: { category: newCategory },
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  
  const id = +req.params.id;
  const index = categories.findIndex((category) => category.id === id);

  if (index === -1) {
    return next(new AppError(`No category found with ID: ${id}`, 404));
  }

  categories.splice(index , 1);

  res.status(200).json({
    status: "success",
    message: "Category deleted successfully",
    data: null
  });

});

module.exports = {
  getAllCategories,
  addCategory,
  deleteCategory,
};