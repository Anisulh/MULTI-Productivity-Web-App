const asyncHandler = require("express-async-handler");
const WorkSpace = require("../models/workSpaceModel");
const List = require("../models/listModel");
const Task = require("../models/taskModel");
const stringToColour = require("../utils/stringToColor");

// get all the workspaces
// GET /api/workspace/
// Authorization needed: has access to req.user
const getWorkSpaces = asyncHandler(async (req, res) => {
  const workSpace = await WorkSpace.find({ user: req.user.id });
  res.status(200).json(workSpace);
});

// get specific workspace
// GET /api/workspace/:workspaceid
// Authorization needed: has access to req.user
const getWorkSpace = asyncHandler(async (req, res) => {
  const workSpace = await WorkSpace.findById(req.params.workspaceid);
  if (!workSpace) {
    res.status(404);
    throw new Error(workSpace);
  }
  res.status(200).json(workSpace);
});

// create a workspace
// POST /api/workspace/
// Authorization needed: has access to req.user
const createWorkSpace = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a workspace name");
  }
  const color = stringToColour(req.body.name);
  const newWorkSpace = await WorkSpace.create({
    user: req.user.id,
    color: color,
    name: req.body.name,
  });
  res.status(200).json(newWorkSpace);
});

// update a workspace
// PUT /api/workspace/:workspaceid
// Authorization needed: has access to req.user
const updateWorkSpace = asyncHandler(async (req, res) => {
  const workSpace = await WorkSpace.findById(req.params.workspaceid);
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add workspace name");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (!workSpace) {
    res.status(404);
    throw new Error("List not found");
  }
  if (workSpace.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  delete req.body._id
  const updatedWorkSpace = await WorkSpace.findOneAndUpdate(
    { _id: req.params.workspaceid },
    req.body,
    { new: true }
  );
  res.status(200).json(updatedWorkSpace);
});

// delete a workspace
// DELETE /api/workspace/:workspaceid
// Authorization needed: has access to req.user
const deleteWorkSpace = asyncHandler(async (req, res) => {
  const workSpace = await WorkSpace.findById(req.params.workspaceid);
  const lists = await List.find({
    user: req.user.id,
    workSpace: req.params.workspaceid,
  });
  const tasks = await Task.find({
    user: req.user.id,
    workSpace: req.params.workspaceid,
  });

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (!workSpace) {
    res.status(404);
    throw new Error("Goal not found");
  }
  if (workSpace.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await workSpace.delete();
  await lists.delete();
  await tasks.delete();
  res.status(200).json({ id: req.params.workspaceid });
});

module.exports = {
  getWorkSpaces,
  getWorkSpace,
  updateWorkSpace,
  createWorkSpace,
  deleteWorkSpace,
};
