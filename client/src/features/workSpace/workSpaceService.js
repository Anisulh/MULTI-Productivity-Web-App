const axios = require("axios");

const API_URI = "http://localhost:9090/api/workspaces/";

// get workspaces from the server thats associated with user
// /api/workspaces/
const getWorkSpaces = async (token) => {
  const response = await axios.get(API_URI, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

//get one workspace from the server that is associated with the user
// /api/workspaces/:workSpaceID
const getWorkSpace = async (workSpaceID, token) => {
  const response = await axios.get(API_URI + workSpaceID, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// create a workspace and add it to the server to the associated user
// /api/workspaces/
const createWorkSpace = async (workSpace, token) => {
  const name = { name: workSpace };
  const response = await axios.post(API_URI, name, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// put a workspace from the associated user
// /api/workspaces/:workspaceID
const updateWorkSpace = async (workSpaceID, workSpaceData, token) => {
  const response = await axios.put(API_URI + workSpaceID, workSpaceData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log(response)
  return response.data;
};

// delete a workspace from the associated user
// /api/workspaces/:workspaceID
const deleteWorkSpace = async (workSpaceID, token) => {
  const response = await axios.delete(API_URI + workSpaceID, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const workSpaceService = {
  getWorkSpaces,
  getWorkSpace,
  createWorkSpace,
  updateWorkSpace,
  deleteWorkSpace,
};
export default workSpaceService;
