import {
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../features/task/taskSlice";

function UpdateTaskForm({ taskItem, lists, setShowUpdateForm }) {
  const dispatch = useDispatch();
  const [updateFormData, setUpdateFormData] = useState({ ...taskItem });
  const { taskName, list, description, tags } = updateFormData;
  const [dueDate, setDueDate] = useState(taskItem.dueDate);
  const tagString = tags.join(" ");
  const onFormChange = (e) => {
    setUpdateFormData((prevState) => ({
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
    let taskInfo = checkFormData(updateFormData);
    taskInfo.dueDate = dueDate;
    console.log(taskInfo);
    const taskID = taskItem._id;
    dispatch(updateTask({ taskID, taskInfo }));
    setShowUpdateForm(false);
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
          value={list}
          name="list"
          onChange={onFormChange}
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
        Update Task
      </Button>
    </form>
  );
}

export default UpdateTaskForm;
