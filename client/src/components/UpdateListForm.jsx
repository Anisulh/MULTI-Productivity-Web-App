import React, { useState } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { updateList } from "../features/list/listSlice";
import { useDispatch } from "react-redux";

function UpdateListForm({ workSpaceID, handleListClose, list }) {
  const dispatch = useDispatch();
  const [listFormData, setListFormData] = useState(list);
  const { name } = listFormData;

  const onFormChange = (e) => {
    setListFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const listID = list._id;
    const listInfo = listFormData;
    const listData = { workSpaceID, listID, listInfo };
    console.log(listData);
    dispatch(updateList(listData));
    handleListClose();
  };
  return (
    <form onSubmit={onFormSubmit}>
      <FormControl>
        <TextField
          variant="standard"
          style={{ width: "400px", margin: "5px", marginBottom: "30px" }}
          type="text"
          name="name"
          id="name"
          value={name}
          required={true}
          onChange={onFormChange}
        />
      </FormControl>
      <Button size="small" variant="contained" type="submit">
        Add a list
      </Button>
    </form>
  );
}

export default UpdateListForm;
