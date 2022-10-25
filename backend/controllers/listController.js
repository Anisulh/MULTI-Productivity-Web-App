const asyncHandler = require("express-async-handler");
const List = require("../models/listModel");
const Task = require('../models/taskModel')
const WorkSpace = require("../models/workSpaceModel");
const stringToColour = require("../utils/stringToColor");


// get all the lists
// GET /api/lists/
// Authorization needed: has access to req.user
const getAllLists = asyncHandler(async (req, res) => {
  const lists = await List.find({ user: req.user.id });
  res.status(200).json(lists);
});

// get all the lists of given workspace
// GET /api/workspaces/:workspaceid/lists/
// Authorization needed: has access to req.user
const getLists = asyncHandler(async (req, res) => {
  const lists = await List.find({
    user: req.user.id,
    workSpace: req.params.workspaceid,
  });
  res.status(200).json(lists);
});

// get specific list
// GET /api/workspaces/:workspaceid/lists/:taskid
// Authorization needed: has access to req.user
const getList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.listid);
  if (!list) {
    res.status(404);
    throw new Error("List not found");
  }
  res.status(200).json(list);
});

// create a list
// POST /api/workspaces/:workspaceid/lists/
// Authorization needed: has access to req.user
const createList = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a list name");
  }

  const color = stringToColour(req.body.name);
  const newList = await List.create({
    user: req.user.id,
    workSpace: req.params.workspaceid,
    name: req.body.name,
    color: color,
  });
  res.status(200).json(newList);
});

// update a list
// PUT /api/workspaces/:workspaceid/lists/:taskid
// Authorization needed: has access to req.user
const updateList = asyncHandler(async (req, res) => {
  const workSpace = await WorkSpace.findById(req.params.workspaceid);
  const list = await List.findById(req.params.listid);
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add list name");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (!list) {
    res.status(404);
    throw new Error("List not found");
  }
  if (!workSpace) {
    res.status(404);
    throw new Error("Workspace not found");
  }
  if (workSpace.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedList = await List.findOneAndUpdate(
    { id: req.params.listid },
    req.body,
    { new: true }
  );
  res.status(200).json(updatedList);
});

// create a list
// DELETE /api/workspaces/:workspaceid/lists/:taskid
// Authorization needed: has access to req.user
const deleteList = asyncHandler(async (req, res) => {
  const workSpace = await WorkSpace.findById(req.params.workspaceid);
  const list = await List.findById(req.params.listid);
  const tasks = await Task.find({ user: req.user.id, list: req.params.listid });

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (!list) {
    res.status(404);
    throw new Error("List not found");
  }
  if (!workSpace) {
    res.status(404);
    throw new Error("Workspace not found");
  }
  if (workSpace.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await list.delete();
  await tasks.delete()
  res.status(200).json({ id: req.params.listid });
});

module.exports = {
  getAllLists,
  getLists,
  getList,
  createList,
  updateList,
  deleteList,
};
