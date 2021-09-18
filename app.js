const express = require("express");

const adminRoutes = require("./routes/admin.routes");
const authRoutes = require("./routes/auth.routes");
const rulesRoutes = require("./routes/rules.routes");

const errorHandler = require("./controllers/error.controller");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/v1/rules", rulesRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    message: `Can't find ${req.originalUrl} in this route`,
  });
});

app.use(errorHandler);

module.exports = app;
