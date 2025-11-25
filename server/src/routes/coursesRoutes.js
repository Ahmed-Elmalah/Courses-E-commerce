const express = require("express");
const CoursesController = require("../controllers/CoursesController");
const router = express.Router();

router.get("/" , CoursesController.getAllCourses);
router.get("/:id" , CoursesController.getCourseById);
router.delete("/:id" ,CoursesController.deleteCourse);

module.exports = router