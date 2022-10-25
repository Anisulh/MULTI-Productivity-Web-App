import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset);
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
    confirmPassword: "",
    showConfirmPassword: false,
    phoneNumber: "",
  });
  const {
    firstName,
    lastName,
    email,
    password,
    showPassword,
    confirmPassword,
    showConfirmPassword,
    phoneNumber,
  } = formData;
  const onFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onShowPassword = () => {
    setFormData((prevState) => ({
      ...prevState,
      showPassword: !showPassword,
    }));
  };

  const onShowConfirmPassword = () => {
    setFormData((prevState) => ({
      ...prevState,
      showConfirmPassword: !showConfirmPassword,
    }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const userInfo = {
        firstName,
        lastName,
        email,
        password,
      };
      if (phoneNumber !== "") {
        userInfo["phoneNumber"] = phoneNumber;
      }
      dispatch(register(userInfo));
    } else {
      toast.error("Passwords do not match");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Grid container direction="column" alignItems="center">
      <h1>Register</h1>
      <form onSubmit={onFormSubmit}>
        <FormControl>
          <TextField
            variant="standard"
            style={{ width: "400px", margin: "5px", marginBottom: "30px" }}
            type="text"
            required={true}
            name="firstName"
            placeholder="Enter your first name"
            value={firstName}
            onChange={onFormChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <TextField
            variant="standard"
            style={{ width: "400px", margin: "5px", marginBottom: "30px" }}
            type="text"
            required={true}
            name="lastName"
            placeholder="Enter your last name"
            value={lastName}
            onChange={onFormChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <TextField
            variant="standard"
            style={{ width: "400px", margin: "5px", marginBottom: "30px" }}
            type="text"
            required={true}
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={onFormChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <TextField
            variant="standard"
            style={{ width: "400px", margin: "5px", marginBottom: "30px" }}
            type="text"
            required={false}
            name="phoneNumber"
            placeholder="Enter your phone number (optional)"
            value={phoneNumber}
            onChange={onFormChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <Input
            variant="standard"
            type={showPassword ? "text" : "password"}
            style={{ width: "400px", margin: "5px", marginBottom: "30px" }}
            name="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={onFormChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={onShowPassword}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <br />
        <FormControl>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            style={{ width: "400px", margin: "5px", marginBottom: "30px" }}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={onFormChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={onShowConfirmPassword}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <br />
          <Button
            type="submit"
            style={{ width: "200px", margin: "auto" }}
            variant="contained"
          >
            Register
          </Button>
        </FormControl>
      </form>
    </Grid>
  );
}

export default Register;
