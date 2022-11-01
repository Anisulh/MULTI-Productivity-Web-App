const axios = require("axios");

const API_URI = "http://localhost:9090/api/workspaces/";

// get lists from the server thats associated with user
// /api/workspaces/:workspaceid/lists
const getAllLists = async (token) => {
  const response = await axios.get("http://localhost:9090/api/lists/", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

// get lists from the server thats associated with workspace and user
// /api/workspaces/:workspaceid/lists
const getLists = async (workSpaceID, token) => {
  const response = await axios.get(API_URI + workSpaceID + "/lists", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

//get one list from the server that is associated with the user
// /api/workspaces/:workspaceid/lists/:listid
const getList = async (workSpaceID, listID, token) => {
  const response = await axios.get(API_URI + workSpaceID + "/lists/" + listID, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// create a list and add it to the server to the associated user
// /api/workspaces/:workspaceid/lists
const createList = async (workSpaceID, listData, token) => {
  const response = await axios.post(
    API_URI + workSpaceID + "/lists",
    listData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// update a list and add it to the server to the associated user
// /api/workspaces/:workspaceid/lists/:lisid
const updateList = async (workSpaceID, listID, listData, token) => {
  const response = await axios.put(
    API_URI + workSpaceID + "/lists/" + listID,
    listData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// delete a list from the associated user
// /api/workspaces/:workspaceid/lists/:listid
const deleteList = async (workSpaceID, listID, token) => {
  const response = await axios.delete(
    API_URI + workSpaceID + "/lists/" + listID,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

const listService = {
  getAllLists,
  getLists,
  getList,
  createList,
  updateList,
  deleteList,
};
export default listService;
