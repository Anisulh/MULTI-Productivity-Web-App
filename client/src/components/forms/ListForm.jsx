import React, { useState } from "react";
import { createList, updateList } from "../../features/list/listSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { HexColorPicker } from "react-colorful";

function ListForm({ list = {}, handleClose, update = false }) {
  const dispatch = useDispatch();
  const { workSpaceID } = useParams();
  const [formData, setFormData] = useState(
    update && list
      ? { ...list }
      : {
          name: "",
          color: "",
        }
  );
  const { name } = formData;
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState(list ? list?.color : "#ffffff");

  const onFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (update) {
      const listID = list._id;
      const listInfo = { name, color };
      const listData = { workSpaceID, listID, listInfo };
      dispatch(updateList(listData));
    } else {
      formData.color = color;
      const listData = { workSpaceID, formData };
      dispatch(createList(listData));
    }

    setFormData(() => ({ name: "", color: "" }));
    handleClose();
  };
  return (
    <div className=" rounded-md p-10 shadow-md bg-white">
      <h1 className="text-xl font-bold flex justify-center mb-5">
        {update ? "Update" : "Create"} Your List
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
        </div>
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

export default ListForm;
