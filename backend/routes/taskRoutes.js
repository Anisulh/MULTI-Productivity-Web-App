const express = require("express");
const router = express.Router();
const { getAllTasks } = require("../controllers/taskController");
const authorization = require("../middleware/authorization");

router.get("/", authorization, getAllTasks);

module.exports = router;
