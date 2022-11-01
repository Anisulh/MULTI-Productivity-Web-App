const axios = require("axios");

const API_URI = "/api/workspaces/";

//get all tasks associated with user
// /api/tasks/
const getAllTasks = async (token) => {
  const response = await axios.get("/api/tasks/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

//get all tasks associated with workspace and user
// /api/workspaces/:workspaceID/tasks
const getWorkSpaceTasks = async (workSpaceID, token) => {
  const response = await axios.get(API_URI + workSpaceID + "/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// get tasks from the server thats associated with user and the listID
// /api/workspaces/:workspaceid/lists/:listid/tasks
const getTasks = async (workSpaceID, listID, token) => {
  const response = await axios.get(
    API_URI + workSpaceID + "/lists/" + listID + "/tasks",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// create a task and add it to the server to the associated user and list
// /api/workspaces/:workspaceid/lists/:listid/tasks/:taskid
const createTask = async (workSpaceID, listID, taskInfo, token) => {

  const response = await axios.post(
    API_URI + workSpaceID + "/lists/" + listID + "/tasks",
    taskInfo,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// update a task from the associated user and list
// /api/workspaces/:workspaceid/lists/:listid/tasks/:taskid
const updateTask = async (workSpaceID, listID, taskID, taskData, token) => {
  const response = await axios.put(
    API_URI + workSpaceID + "/lists/" + listID + "/tasks/" + taskID,
    taskData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

//delete a task from the associated user
// /api/workspaces/:workspaceid/lists/:listid/tasks/:taskid
const deleteTask = async (workSpaceID, listID, taskID, token) => {
  const response = await axios.delete(
    API_URI + workSpaceID + "/lists/" + listID + "/tasks/" + taskID,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

const taskService = {
  getAllTasks,
  getWorkSpaceTasks,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
export default taskService;
