  const AppError = require("../utils/appError");
  const asyncHandler = require("../utils/asyncHandler");
  const courses = require("../models/courseModel");

  const getAllCourses = asyncHandler(async (req, res, next) => {
    const { search, category, sort } = req.query;

    let result = [...courses];

    if (search) {
      result = result.filter(
        (course) =>
          course.title
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase()) ||
          course.instructor
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase())
      );
    }

    if (category) {
      result = result.filter((course) => course.categoryId === +category);
    }

    if (sort) {
      if (sort === "price") {
        result.sort((a, b) => a.price - b.price);
      } else if (sort === "-price") {
        result.sort((a, b) => b.price - a.price);
      }
    }

    res.json({
      status: "success",
      results: result.length,
      data: { courses: result },
    });
  });

  const getCourseById = asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const course = courses.find((course) => course.id === id);

    if (!course) {
      return next(new AppError(`No course found with ID: ${id}`, 404));
    }

    res.status(200).json({
      status: "success",
      message: "Course Found",
      data: course,
    });
  });

  const deleteCourse = asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const index = courses.findIndex((course) => course.id === id);

    if (index === -1) {
      return next(
        new AppError(`Can't find course with id: ${id} to delete`, 404)
      );
    }

    courses.splice(index, 1);

    res.status(200).json({
      status: "success",
      message: "Course deleted",
      data: null,
    });
  });

  const createCourse = asyncHandler(async (req, res, next) => {
    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    const newCourse = {
      id: newId,
      ...req.body,
      lessons: req.body.lessons || [],
    };

    courses.push(newCourse);

    res.status(201).json({
      status: "success",
      message: "New course added",
      data: { course: newCourse },
    });
  });

  const updateCourse = asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const course = courses.find((c) => c.id === id);

    if (!course) {
      return next(new AppError(`No course found with ID: ${id}`, 404));
    }

    Object.assign(course, req.body);

    res.status(200).json({
      status: "success",
      data: { course },
    });
  });

  module.exports = {
    getAllCourses,
    getCourseById,
    deleteCourse,
    createCourse,
    updateCourse,
  };
