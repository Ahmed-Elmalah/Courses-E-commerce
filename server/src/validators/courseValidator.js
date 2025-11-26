const Joi = require("joi");
const AppError = require('../utils/appError');

const courseSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  instructor: Joi.string().min(3).required(),
  duration: Joi.number().positive().required(), 
  difficulty: Joi.string().valid('Beginner', 'Intermediate', 'Advanced', 'All Levels').required(), 
  categoryId: Joi.number().integer().required(),
  price: Joi.number().min(0).optional(), 
  description: Joi.string().min(10).optional(),
  lessons: Joi.array().items(
    Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        duration: Joi.string().required()
    })
  ).optional()
});

const validateCourse = (req, res, next) => {
  const { error } = courseSchema.validate(req.body);

  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  next();
};

module.exports = validateCourse;