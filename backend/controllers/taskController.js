const asyncHandler = require("express-async-handler");
const List = require("../models/listModel");
const Task = require("../models/taskModel");
const WorkSpace = require("../models/workSpaceModel");

//get all tasks of given workspace
// GET /api/tasks
// Authorization needed: has access to req.user
const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id
  });
  res.status(200).json(tasks);
});

//get all tasks of given workspace
// GET /api/workspaces/:workspaceid/tasks
// Authorization needed: has access to req.user
const getWorkSpaceTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id,
    workSpace: req.params.workspaceid,
  });
  res.status(200).json(tasks);
});

// get list specific tasks
// GET /api/workspaces/:workspaceid/lists/:listid/tasks
// Authorization needed: has access to req.user
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id,
    workSpace: req.params.workspaceid,
    list: req.params.listid,
  });
  res.status(200).json(tasks);
});

// create a task
// POST /api/workspaces/:workspaceid/lists/:listid/tasks
// Authorization needed: has access to req.user
const createTask = asyncHandler(async (req, res) => {
  if (!req.body.taskName) {
    res.status(400);
    throw new Error("Please add a task");
  }
  const adminInfo = {
    user: req.user.id,
    workSpace: req.params.workspaceid,
    list: req.params.listid,
  };
  //add req.body contents to adminInfo
  const taskInfo = Object.assign(adminInfo, req.body);
  const newTask = await Task.create(taskInfo);
  res.status(200).json(newTask);
});

// update specific tasks
// PUT /api/workspaces/:workspaceid/lists/:listid/tasks/:taskid
// Authorization needed: has access to req.user
const updateTask = asyncHandler(async (req, res) => {
  const workSpace = await WorkSpace.findById(req.params.workspaceid);
  const list = await List.findById(req.params.listid);
  const task = await Task.findById(req.params.taskid);
  if (!req.body.taskName) {
    res.status(400);
    throw new Error("Please add task name");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (!list) {
    res.status(404);
    throw new Error("List not found");
  }
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  if (!workSpace) {
    res.status(404);
    throw new Error("Workspace not found");
  }
  if (workSpace.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  if (task.list.toString() !== list.id) {
    res.status(401);
    throw new Error("List not authorized");
  }
  delete req.body._id;
  const updatedTask = await Task.findOneAndUpdate(
    { _id: req.params.taskid },
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTask);
});

// delete specific task
// DELETE /api/workspaces/:workspaceid/lists/:listid/tasks//:taskid
// Authorization needed: has access to req.user
const deleteTask = asyncHandler(async (req, res) => {
  const workSpace = await WorkSpace.findById(req.params.workspaceid);
  const list = await List.findById(req.params.listid);
  const task = await Task.findById(req.params.taskid);

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (!list) {
    res.status(404);
    throw new Error("List not found");
  }
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  if (!workSpace) {
    res.status(404);
    throw new Error("Workspace not found");
  }
  if (workSpace.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  if (task.list.toString() !== list.id) {
    res.status(401);
    throw new Error("List not authorized");
  }
  await task.delete();
  res.status(200).json({ id: req.params.taskid });
});

module.exports = {
  getAllTasks,
  getWorkSpaceTasks,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
