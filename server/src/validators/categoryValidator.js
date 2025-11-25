const Joi = require('joi');
const AppError = require('../utils/appError');

const categorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required()
});

const validateCategory = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }
  next();
};

module.exports = validateCategory;