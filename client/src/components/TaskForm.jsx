import React, { useState } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTask } from "../features/task/taskSlice";
import { useDispatch } from "react-redux";

function TaskForm({ workSpaceID, lists, handleTaskClose }) {
  const dispatch = useDispatch();
  const [taskFormData, setTaskFormData] = useState({
    taskName: "",
    description: "",
    tagString: "",
  });
  const [listID, setListID] = useState("");
  const [dueDate, setDueDate] = useState(null);

  const { taskName, description, tagString } = taskFormData;
  const onFormChange = (e) => {
    setTaskFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSelectChange = (e) => {
    setListID(e.target.value);
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
    let taskInfo = checkFormData(taskFormData);
    if (dueDate) {
      taskInfo.dueDate = dueDate;
    }
    const taskData = {
      workSpaceID,
      listID,
      taskInfo,
    };
    dispatch(createTask(taskData));
    setTaskFormData(() => ({
      task: "",
      description: "",
      tags: [],
    }));
    handleTaskClose();
  };
  return (
    <form onSubmit={onFormSubmit}>
      <FormControl variant="standard">
        <InputLabel id="list-label" sx={{ marginLeft: "5px" }}>
          List
        </InputLabel>
        <Select
          labelId="list-label"
          autoWidth
          native
          value={listID}
          onChange={handleFormSelectChange}
          label="List"
          sx={{ marginLeft: "5px" }}
        >
          <option value={""}></option>
          {lists.length > 0 ? (
            lists.map((list) => (
              <option key={list._id} value={list._id}>
                {list.name}
              </option>
            ))
          ) : (
            <option aria-label="No Lists to show" value="" />
          )}
        </Select>
      </FormControl>
      <br />
      <FormControl>
        <TextField
          variant="standard"
          style={{ width: "400px", margin: "5px", marginBottom: "30px" }}
          type="text"
          label="Task Name"
          name="taskName"
          id="taskName"
          value={taskName}
          required={true}
          onChange={onFormChange}
        />
      </FormControl>
      <br />
      <FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Pick a due date"
            style={{ width: "400px", margin: "5px", marginBottom: "30px" }}
            value={dueDate}
            onChange={(date) => setDueDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>
      <br />
      <FormControl>
        <TextField
          variant="standard"
          style={{ width: "400px", margin: "5px", marginBottom: "30px" }}
          type="text"
          name="description"
          label="Task Description"
          id="description"
          value={description}
          required={false}
          onChange={onFormChange}
        />
      </FormControl>
      <br />
      <FormControl>
        <TextField
          variant="standard"
          style={{ width: "400px", margin: "5px", marginBottom: "30px" }}
          type="text"
          name="tagString"
          id="tagString"
          label="Tags (seperate by spaces)"
          value={tagString}
          required={false}
          onChange={onFormChange}
        />
      </FormControl>
      <Button size="small" variant="contained" type="submit">
        Add Task
      </Button>
    </form>
  );
}

export default TaskForm;
