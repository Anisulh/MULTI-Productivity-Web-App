import React from "react";
import { Link, useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <div className="flex items-center" onClick={() => navigate("/")}>
          <img
            src="/logo.svg"
            alt="logo"
            className="cursor-pointer duration-300 absolute h-24 top-0 left-5"
          />
        </div>
        <h1 className="text-7xl font-extrabold ">
          <span className="block xl:inline text-indigo-600">404</span>{" "}
          <span className="block xl:inline">Page Not Found.</span>
        </h1>
        <p className="flex justify-center mt-2 text-lg text-gray-500">
          Could not find the page you were looking for
        </p>
        <div className="flex justify-center text-lg">
          <Link
            to="/"
            className="link-underline link-underline-black text-indigo-600 "
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
