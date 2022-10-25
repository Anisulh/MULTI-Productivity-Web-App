import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Spinner from "../components/Spinner";
import { updateUser } from "../features/auth/authSlice";

function ProfileForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isError, message, navigate, user]);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    avatar: null,
  });

  const { firstName, lastName, email, phoneNumber } = formData;

  const onFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onAttachmentChange = (e) => {
    console.log(e);
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    setFormData((prevState) => ({
      ...prevState,
      avatar: formData,
    }));
  };

  //check if any keys have empty or null values
  const checkFormData = (obj) => {
    let data = {};
    for (let key in obj) {
      if (obj[key] !== null && obj[key] !== "") {
        data[key] = obj[key];
      }
    }
    return data;
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    //only use data that have been changed
    const userData = checkFormData(formData);
    dispatch(updateUser(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Button
        size="small"
        variant="contained"
        onClick={() => {
          setIsEditing((prevState) => !prevState);
        }}
      >
        {isEditing ? "Cancel" : "Edit"}
      </Button>
      <form onSubmit={onFormSubmit} encType="multipart/form-data">
        <br />
        <FormControl>
          <TextField
            variant="standard"
            InputProps={{ disableUnderline: true }}
            label="upload avatar"
            type="file"
            accept="image/*"
            onChange={onAttachmentChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <TextField
            variant="standard"
            style={{ width: "400px", margin: "5px", marginBottom: "30px" }}
            type="text"
            label="First Name"
            name="firstName"
            value={firstName}
            placeholder={user.firstName}
            onChange={onFormChange}
          />
        </FormControl>
        <FormControl>
          <TextField
            variant="standard"
            style={{ width: "400px", margin: "5px", marginBottom: "30px" }}
            type="text"
            label="Last Name"
            name="lastName"
            placeholder={user.lastName}
            value={lastName}
            onChange={onFormChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <TextField
            variant="standard"
            style={{ width: "400px", margin: "5px", marginBottom: "30px" }}
            type="email"
            name="email"
            label="Email"
            value={email}
            placeholder={user.email}
            onChange={onFormChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <TextField
            variant="standard"
            style={{ width: "400px", margin: "5px", marginBottom: "30px" }}
            type="number"
            name="phoneNumber"
            label="Contact Number"
            value={phoneNumber}
            placeholder={user.phoneNumber}
            onChange={onFormChange}
          />
          <Button size="small" variant="contained" type="submit">
            Save
          </Button>
        </FormControl>
      </form>
    </Grid>
  );
}

export default ProfileForm;
