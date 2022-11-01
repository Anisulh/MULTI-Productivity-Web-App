import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createWorkSpace,
  updateWorkSpace,
} from "../../features/workSpace/workSpaceSlice";

function WorkSpaceForm({ workSpace = {}, handleClose, update = false }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(
    update && workSpace !== {}
      ? { ...workSpace }
      : {
          name: "",
          color: "",
        }
  );
  const { name, color } = formData;
  const onFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (update && workSpace) {
      const workSpaceInfo = {
        name,
        color,
      };
      const workSpaceID = workSpace._id;
      dispatch(updateWorkSpace({ workSpaceID, workSpaceInfo }));
    } else {
      dispatch(createWorkSpace(formData));
    }
    setFormData({
      name: "",
      color: ""
    })
    handleClose();
  };

  return (
    <div className=" rounded-md p-10 shadow-md bg-white text-black">
      <h1 className="text-xl font-bold flex justify-center mb-5">
        {update ? "Update" : "Create"} Your Workspace
      </h1>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          name="name"
          className="block w-full border-2 rounded-md mb-5 p-2 sm:text-lg"
          placeholder="Name"
          value={name}
          onChange={onFormChange}
          required
        />
        <div className="flex items-center justify-between">
          <input
            type="text"
            name="color"
            className="block w-full border-2 p-2 mb-5 rounded-md sm:text-lg mr-5"
            placeholder="Hexadecimal Color Code"
            value={color}
            onChange={onFormChange}
          />
          <div
            className="h-6 w-6 -mt-5 border "
            style={{ backgroundColor: color }}
          ></div>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-base font-medium text-white hover:bg-indigo-700 md:px-10 md:text-lg"
        >
          Submit
        </button>
      </form>
      <div className="max-w-sm w-full flex items-center justify-center mt-2 -mb-2">
        <button
          className="rounded-md border border-transparent bg-indigo-100 px-8 py-2 text-sm text-black hover:bg-indigo-400 md:px-10 md:text-base"
          onClick={() => {
            handleClose();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default WorkSpaceForm;
