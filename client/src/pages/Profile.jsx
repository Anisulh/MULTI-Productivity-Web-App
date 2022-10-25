import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import Spinner from "../components/Spinner";

import { Avatar, Typography } from "@mui/material";

function Profile() {
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
      <Avatar alt={user.firstName} src="/static/images/avatar/2.jpg" />
      <Typography>Name: {user.firstName}</Typography>
      <Typography>Email: {user.email}</Typography>
      <Button> Change Email</Button>
      <Typography>Password</Typography>
      <Button> Change Password</Button>
    </Grid>
  );
}

export default Profile;
