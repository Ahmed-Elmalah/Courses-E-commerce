// src/utils/appError.js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // بنبعت الرسالة للكلاس الأب (Error)

    this.statusCode = statusCode;
    // لو الكود يبدأ بـ 4 يبقى fail، لو 5 يبقى error
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // عشان نميز بين الأخطاء اللي إحنا متوقعينها والـ Bugs

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;