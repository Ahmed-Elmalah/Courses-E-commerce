const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();
const validateCategory = require("../validators/categoryValidator");

router.get("/", categoryController.getAllCategories);
router.post("/",validateCategory, categoryController.addCategory);
router.delete("/:id", categoryController.deleteCategory);
router.put("/:id", validateCategory,categoryController.updateCategory);

module.exports = router;