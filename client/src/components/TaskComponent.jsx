import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/task/taskSlice";
import { useParams } from "react-router-dom";

function TaskComponent({ taskItem }) {
  const dispatch = useDispatch();
  const { listID } = useParams();
  const onDelete = () => {
    const taskID = taskItem._id;
    dispatch(deleteTask({ listID, taskID }));
  };
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={taskItem.task} />
    </ListItem>
  );
}

export default TaskComponent;
