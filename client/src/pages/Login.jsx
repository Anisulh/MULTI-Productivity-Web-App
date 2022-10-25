import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { login, reset } from "../features/auth/authSlice";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
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

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const { email, password, showPassword } = formData;

  const onFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onShowPassword = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      showPassword: !showPassword,
    }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      email,
      password,
    };
    dispatch(login(userInfo));
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
      <h1>Login</h1>
      <form onSubmit={onFormSubmit}>
        <FormControl>
          <TextField
            variant="standard"
            style={{ width: "400px", margin: "5px", marginBottom: "30px" }}
            name="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={onFormChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <Input
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
          <br />
          <Button
            style={{ width: "200px", margin: "auto" }}
            type="submit"
            variant="contained"
          >
            Login
          </Button>
        </FormControl>
      </form>
    </Grid>
  );
}

export default Login;
