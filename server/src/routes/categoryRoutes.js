const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

router.get("/", categoryController.getAllCategories);
router.post("/", categoryController.addCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;