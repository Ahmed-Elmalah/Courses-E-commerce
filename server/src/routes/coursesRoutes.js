const express = require("express");
const CoursesController = require("../controllers/CoursesController");
const validateCourse = require("../validators/courseValidator");
const router = express.Router();

router.get("/" , CoursesController.getAllCourses);
router.get("/:id" , CoursesController.getCourseById);
router.delete("/:id" ,CoursesController.deleteCourse);
router.post("/" , validateCourse , CoursesController.createCourse);
router.put("/:id", validateCourse , CoursesController.updateCourse);

module.exports = router;