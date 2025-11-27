const Joi = require("joi");
const AppError = require("../utils/appError");

const lessonSchema = Joi.object({
  title: Joi.string().required().min(3),
  content: Joi.string().required(),
  duration: Joi.string().required(),
});

const validateLesson = (req,res ,next) =>{
    const {error} = lessonSchema.validate(req.body);
    if(error){
        return next(new AppError(error.details[0].message, 400));
    }
    next();
}

module.exports = validateLesson;