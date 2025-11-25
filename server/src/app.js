const express = require("express");
const app = express();
const categoryRoutes = require("./routes/categoryRoutes");
const coursesRoutes = require("./routes/coursesRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api/category" , categoryRoutes);
app.use("/api/courses" , coursesRoutes);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;