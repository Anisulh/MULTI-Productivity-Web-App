const express = require("express");
const {
  getLists,
  createList,
  deleteList,
  updateList,
  getList,
} = require("../controllers/listController");
const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  getWorkSpaceTasks,
} = require("../controllers/taskController");
const {
  getWorkSpaces,
  getWorkSpace,
  createWorkSpace,
  updateWorkSpace,
  deleteWorkSpace,
} = require("../controllers/workSpaceController");
const router = express.Router();
const authorization = require("../middleware/authorization");

router
  .route("/")
  .get(authorization, getWorkSpaces)
  .post(authorization, createWorkSpace);
router
  .route("/:workspaceid")
  .get(authorization, getWorkSpace)
  .put(authorization, updateWorkSpace)
  .delete(authorization, deleteWorkSpace);
router.route("/:workspaceid/tasks").get(authorization, getWorkSpaceTasks);
router
  .route("/:workspaceid/lists")
  .get(authorization, getLists)
  .post(authorization, createList);
router
  .route("/:workspaceid/lists/:listid")
  .get(authorization, getList)
  .put(authorization, updateList)
  .delete(authorization, deleteList);
router
  .route("/:workspaceid/lists/:listid/tasks")
  .get(authorization, getTasks)
  .post(authorization, createTask);
router
  .route("/:workspaceid/lists/:listid/tasks/:taskid")
  .put(authorization, updateTask)
  .delete(authorization, deleteTask);

module.exports = router;
