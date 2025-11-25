const categories = require("../models/categoryModel");

const getAllCategories = (req, res) => {
  res.json(categories);
};

const addCategory = (req, res) => {
  const newCategory = {
    id: req.body.id || categories.length + 1,
    name: req.body.name,
  };

  categories.push(newCategory);
  res.status(201).json(newCategory);
};

const deleteCategory = (req, res) => {
  const id = +req.params.id;
  const index = categories.findIndex((category) => category.id === id);
  categories.splice(index , 1);
  res.json({message : "category deleted successfully"})
};

module.exports = {
  getAllCategories,
  addCategory,deleteCategory,
};