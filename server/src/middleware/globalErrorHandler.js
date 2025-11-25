module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    // بنعرض الـ stack بس لو إحنا في بيئة التطوير عشان نعرف الخطأ فين
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
  });
};