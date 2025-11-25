const express = require("express");
const app = express();
const categoryRoutes = require("./routes/categoryRoutes");

app.use(express.json());
app.use("/api/category" , categoryRoutes);

module.exports = app;