import { useState } from "react";
import { createTask, updateTask } from "../../features/task/taskSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function TaskForm({
  task = {},
  lists = [],
  list = "",
  handleClose,
  update = false,
}) {
  const dispatch = useDispatch();
  const { workSpaceID } = useParams();
  const [formData, setFormData] = useState(
    update && task !== {}
      ? task
      : {
          taskName: "",
          description: "",
          tagString: "",
          dueDate: "",
        }
  );
  const [newListID, setNewListID] = useState(task !== {} && task.list);
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
    const parsedInfo = checkFormData(formData);
    const taskInfo = {
      taskName: parsedInfo.taskName,
      description: parsedInfo.description,
      tags: parsedInfo.tags,
      dueDate: parsedInfo.dueDate,
    };
    let listID;
    if (update) {
      taskInfo.list = newListID;
      taskInfo.workSpace = task.workSpace;
      const taskID = task._id;
      dispatch(updateTask({ taskID, taskInfo }));
    } else {
      listID = list;
      dispatch(createTask({ workSpaceID, listID, taskInfo }));
    }
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
        {update ? "Update" : "Create"} Your Task
      </h1>
      <form onSubmit={onFormSubmit}>
        {update && lists.length > 0 ? (
          <select
            name="list"
            onChange={(e) => setNewListID(e.target.value)}
            defaultValue={task.list}
            className="w-full border-2 rounded-md mb-2 p-2 sm:text-lg"
          >
            {lists?.map((list) => {
              return (
                <option value={list._id} key={list._id}>
                  {list.name}
                </option>
              );
            })}
          </select>
        ) : null}
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
        />
        <input
          type="text"
          name="tagString"
          className="block w-full border-2 rounded-md mb-2 p-2 sm:text-lg"
          placeholder="Tags"
          value={task !== {} ? task?.tags?.join(" ") : tagString}
          onChange={onFormChange}
        />
        <input
          type="date"
          name="dueDate"
          className="block w-full border-2 rounded-md mb-2 p-2 sm:text-lg"
          placeholder="Due Date"
          value={task !== {} ? dueDate?.substring(0, 10) : dueDate}
          onChange={onFormChange}
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

export default TaskForm;
