import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

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
  const eyeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );

  const eyeSlashIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );

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
    <div>
      <div className="flex items-center h-screen justify-center">
        <div className="absolute left-5 top-0">
          <button className="cursor-pointer" onClick={() => navigate("/")}>
            <span className="sr-only">Multi Logo</span>
            <img alt="Your Company" className="w-20 sm:h-24" src="/logo.svg" />
          </button>
        </div>

        <div>
          <h1 className="text-5xl font-bold flex justify-center mb-5">
            Register
          </h1>
          <form onSubmit={onFormSubmit}>
            <input
              type="text"
              name="firstName"
              className="block w-full border-2 rounded-md mb-5 p-2 text-lg"
              placeholder="First Name"
              onChange={onFormChange}
            />
            <input
              type="text"
              name="lastName"
              className="block w-full border-2 rounded-md mb-5 p-2 text-lg"
              placeholder="Last Name"
              onChange={onFormChange}
            />
            <input
              type="email"
              name="email"
              className="block w-full border-2 rounded-md mb-5 p-2 text-lg"
              placeholder="email@email.com"
              onChange={onFormChange}
            />
            {/* make sure to add show password icon */}
            <div className="flex justify-start items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="block w-full border-2 border-r-0 p-2 mb-5 rounded-md rounded-r-none text-lg"
                placeholder="password"
                onChange={onFormChange}
              />
              <button
                type="button"
                className="text-gray-400 cursor-pointer border-2 border-l-0  rounded-l-none rounded-md p-2 h-12 mb-5"
                onClick={onShowPassword}
              >
                {showPassword ? eyeSlashIcon : eyeIcon}
              </button>
            </div>

            <div className="flex justify-start items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className="block w-full border-2 border-r-0 p-2 mb-5 rounded-md rounded-r-none text-lg"
                placeholder="confirm password"
                onChange={onFormChange}
              />
              <button
                type="button"
                className="text-gray-400 cursor-pointer border-2 border-l-0  rounded-l-none rounded-md p-2 h-12 mb-5"
                onClick={onShowConfirmPassword}
              >
                {showConfirmPassword ? eyeSlashIcon : eyeIcon}
              </button>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-base font-medium text-white hover:bg-indigo-700 md:px-10 md:text-lg"
            >
              Submit
            </button>
          </form>
          <div className="flex justify-center mt-10">
            <p className="pr-1">Already have an account? </p>{" "}
            <Link to="/login" className="hover:text-indigo-600">
              {" "}
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
