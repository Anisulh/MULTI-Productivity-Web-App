const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const errorHandler = require("../middleware/errorHandler");

function createServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  //routes
  app.use("/api/users", require("../routes/userRoutes"));
  app.use("/api/workspaces", require("../routes/workSpaceRoutes"));
  app.use("/api/lists", require("../routes/listRoutes"));
  app.use("/api/tasks", require("../routes/taskRoutes"));

  //errorHandler
  app.use(errorHandler);
  return app;
};

module.exports = createServer;
