const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");
const courses = require("../models/courseModel");

getAllCourses = asyncHandler(async (req, res, next) => {
  const { search } = req.query;

  if (search) {
    const filterdCourses = courses.filter((course) =>
      course.title.trim().toLowerCase().includes(search.trim().toLowerCase())
    );
    return res.json({
      status: "success",
      results: filterdCourses.length,
      data: { filterdCourses },
    });
  }

  res.json({
    status: "success",
    results: courses.length,
    data: { courses },
  });
});

getCourseById = asyncHandler(async (req, res, next) => {
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

deleteCourse = asyncHandler( async (req , res , next)=>{
    const id = +req.params.id;
    const index = courses.findIndex((course)=> course.id ===  id);

    if (index === -1){
        return next(new AppError(`Can't find course with id: ${id} to delete`,404));
    }

    courses.splice(index, 1);
    
    res.status(200).json({
    status: "success",
    message: "Course deleted",
    data: null,
  });
})

module.exports = {
  getAllCourses,
  getCourseById,deleteCourse,
};
