const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");
const courses = require("../models/courseModel");

// 1. Add Lesson (POST /api/courses/:courseId/lessons)
const addLesson = asyncHandler(async (req, res, next) => {
  const courseId = +req.params.courseId;
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  // التأكد من وجود مصفوفة lessons (لو مش موجودة ننشئها)
  if (!course.lessons) {
    course.lessons = [];
  }

  const newLesson = {
    id: course.lessons.length + 1, 
    ...req.body,
  };

  course.lessons.push(newLesson);

  res.status(201).json({
    status: "success",
    data: { lesson: newLesson },
  });
});

// 2. Update Lesson (PUT /api/courses/:courseId/lessons/:lessonId)
const updateLesson = asyncHandler(async (req, res, next) => {
  const courseId = +req.params.courseId;
  const lessonId = +req.params.lessonId;

  const course = courses.find((c) => c.id === courseId);
  if (!course) return next(new AppError("Course not found", 404));

  const lesson = course.lessons.find((l) => l.id === lessonId);
  if (!lesson) return next(new AppError("Lesson not found", 404));

  // تحديث البيانات
  Object.assign(lesson, req.body);

  res.status(200).json({
    status: "success",
    data: { lesson },
  });
});

// 3. Delete Lesson (DELETE /api/courses/:courseId/lessons/:lessonId)
const deleteLesson = asyncHandler(async (req, res, next) => {
  const courseId = +req.params.courseId;
  const lessonId = +req.params.lessonId;

  const course = courses.find((c) => c.id === courseId);
  if (!course) return next(new AppError("Course not found", 404));

  const lessonIndex = course.lessons.findIndex((l) => l.id === lessonId);
  if (lessonIndex === -1) return next(new AppError("Lesson not found", 404));

  // حذف الدرس من المصفوفة
  course.lessons.splice(lessonIndex, 1);

  res.status(200).json({
    status: "success",
    data: null,
  });
});

module.exports = { addLesson, updateLesson, deleteLesson };