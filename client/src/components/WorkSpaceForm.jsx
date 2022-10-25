import React from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

function WorkSpaceForm({ onFormSubmit, name, onFormChange }) {
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
      <br />
      <Button size="small" variant="contained" type="submit">
        Add Workspace
      </Button>
    </form>
  );
}

export default WorkSpaceForm;
