import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import LandingPage from "./pages/LandingPage";
import WorkSpaceBoard from "./pages/WorkSpaceBoard";
import WorkSpaceList from "./pages/WorkSpaceList";


function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/workspaces/:workSpaceID" element={<WorkSpaceBoard />} />
            <Route
              path="/workspaces/:workSpaceID/list"
              element={<WorkSpaceList />}
            />
            <Route path="/calendar" element={<Calendar />} />

          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
