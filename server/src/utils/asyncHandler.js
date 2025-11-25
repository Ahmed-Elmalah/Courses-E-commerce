module.exports = (fn) => {
  return (req, res, next) => {
    // أي خطأ يحصل جوه الدالة، ابعته للـ next() عشان يروح للـ Global Handler
    fn(req, res, next).catch(next);
  };
};