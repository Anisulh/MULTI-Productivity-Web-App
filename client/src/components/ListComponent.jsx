import React from "react";
import { useDispatch } from "react-redux";
import { deleteList } from "../features/list/listSlice";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function ListComponent({ list, workSpaceID }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onDelete = () => {
    const listID = list._id;
    const listData = { workSpaceID, listID };
    dispatch(deleteList(listData));
  };

  return (
    <ListItem >
      <IconButton edge="end" aria-label="delete" onClick={onDelete} sx={{marginLeft: "-5px", marginRight: "5px"}}>
        <DeleteIcon />
      </IconButton>
      <ListItemText primary={list.name} onClick={() => navigate(`/${list._id}`)}/>
    </ListItem>
  );
}

export default ListComponent;
