import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createWorkSpace,
  updateWorkSpace,
} from "../../features/workSpace/workSpaceSlice";
import { HexColorPicker } from "react-colorful";

function WorkSpaceForm({ workSpace = {}, handleClose, update = false }) {
  const dispatch = useDispatch();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [formData, setFormData] = useState(
    update && workSpace !== {}
      ? { ...workSpace }
      : {
          name: "",
          color: "",
        }
  );
  const [color, setColor] = useState(workSpace ? workSpace?.color : "#ffffff")
  const { name } = formData;
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
      const workSpaceData = formData;
      workSpaceData.color = color
      dispatch(createWorkSpace(workSpaceData));
    }
    setFormData({
      name: "",
      color: "",
    });
    setColor("")
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
            onChange={(e) => setColor(e.target.value)}
          />

          <div
            className="h-8 w-8 -mt-5 border-2 rounded-md cursor-pointer  "
            style={{ backgroundColor: color }}
            onClick={() => setShowColorPicker(true)}
          ></div>
          <div
            className={`absolute top-0 left-0 flex items-center h-screen w-screen justify-center backdrop-brightness-50 ${
              showColorPicker ? "block" : "hidden"
            }`}
          >
            <div className="bg-white p-5 rounded-md">
              <HexColorPicker color={color} onChange={setColor} />
              <button
                type="button"
                onClick={() => setShowColorPicker(false)}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-base font-medium text-white hover:bg-indigo-700 md:px-10 md:text-lg mt-3"
              >
                Done
              </button>
            </div>
          </div>
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
