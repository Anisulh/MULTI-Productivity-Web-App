import { useState } from "react";
import { createTask } from "../../features/task/taskSlice";
import { useDispatch } from "react-redux";
import format from "date-fns/format";

function CalendarTaskForm({ lists, handleClose, date, workSpaces }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    tagString: "",
    dueDate: format(date, "yyyy-MM-dd"),
  });
  const [listID, setListID] = useState(lists[0]?._id);
  const [workSpaceID, setWorkSpaceID] = useState(workSpaces[0]?._id);
  const { taskName, description, tagString, dueDate } = formData;
  const onFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //check if any keys have empty or null values; changes tagString into a tag array
  const checkFormData = (obj) => {
    let data = {};
    for (let key in obj) {
      if (key === "tagString" && obj[key] !== "") {
        let tags = tagString.split(" ");
        data["tags"] = tags;
      } else if (obj[key] !== null && obj[key] !== "") {
        data[key] = obj[key];
      }
    }
    return data;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const taskInfo = checkFormData(formData);
    console.log(workSpaceID, listID, taskInfo);
    dispatch(createTask({ workSpaceID, listID, taskInfo }));
    setFormData({
      taskName: "",
      description: "",
      tagString: "",
      dueDate: "",
    });
    handleClose();
  };
  return (
    <div className=" rounded-md p-10 shadow-md bg-white">
      <h1 className="text-xl font-bold flex justify-center mb-5">
        Create Your Task
      </h1>
      <form onSubmit={onFormSubmit}>
        <select
          name="workSpaces"
          onChange={(e) => setWorkSpaceID(e.target.value)}
          className="w-full border-2 rounded-md mb-2 p-2 sm:text-lg"
          required
        >
          {workSpaces?.map((workspace) => {
            return (
              <option value={workspace._id} key={workspace._id}>
                {workspace.name}
              </option>
            );
          })}
        </select>

        <select
          name="list"
          onChange={(e) => setListID(e.target.value)}
          className="w-full border-2 rounded-md mb-2 p-2 sm:text-lg"
          required
        >
          {lists?.map((list) => {
            return (
              <option value={list._id} key={list._id}>
                {list.name}
              </option>
            );
          })}
        </select>

        <input
          type="text"
          name="taskName"
          className="block w-full border-2 rounded-md mb-2 p-2 sm:text-lg"
          placeholder="Name"
          value={taskName}
          onChange={onFormChange}
          required
        />
        <textarea
          name="description"
          className="block w-full border-2 rounded-md mb-2 p-2 sm:text-lg"
          placeholder="Description"
          value={description}
          onChange={onFormChange}
          required
        />
        <input
          type="text"
          name="tagString"
          className="block w-full border-2 rounded-md mb-2 p-2 sm:text-lg"
          placeholder="Tags"
          value={tagString}
          onChange={onFormChange}
          required
        />
        <input
          type="date"
          name="dueDate"
          className="block w-full border-2 rounded-md mb-2 p-2 sm:text-lg"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            const formattedDate = newDate.toISOString().substring(0, 10);
            console.log(formattedDate);
            setFormData((prevState) => ({
              ...prevState,
              dueDate: formattedDate,
            }));
          }}
          required
        />

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

export default CalendarTaskForm;
