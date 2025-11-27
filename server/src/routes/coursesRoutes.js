const express = require("express");
const CoursesController = require("../controllers/CoursesController");
const validateCourse = require("../validators/courseValidator");
const validateLesson = require("../validators/lessonValidator");
const lessonsController = require("../controllers/lessonsController");
const router = express.Router();

router.get("/" , CoursesController.getAllCourses);
router.get("/:id" , CoursesController.getCourseById);
router.delete("/:id" ,CoursesController.deleteCourse);
router.post("/" , validateCourse , CoursesController.createCourse);
router.put("/:id", validateCourse , CoursesController.updateCourse);

router.post("/:courseId/lessons", validateLesson, lessonsController.addLesson);
router.put("/:courseId/lessons/:lessonId", validateLesson, lessonsController.updateLesson);
router.delete("/:courseId/lessons/:lessonId", lessonsController.deleteLesson);

module.exports = router;