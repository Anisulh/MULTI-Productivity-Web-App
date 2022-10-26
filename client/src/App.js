import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import ListPage from "./pages/ListPage";

import BoardView from "./pages/BoardView";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import MyTasks from "./pages/MyTasks";

import ListView from "./pages/ListView";
import Calendar from "./pages/Calendar";
import WorkSpaceCalendarView from "./pages/WorkSpaceCalendarView";
import WorkSpaceListView from "./pages/WorkSpaceListView";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div>
          {user ? <Header /> : null}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />

            <Route path="/listview" element={<ListView />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:workSpaceID" element={<ListPage />} />
            <Route
              path="/listview/:workSpaceID/lists/:listID"
              element={<ListPage />}
            />
            <Route path="/boardview/:workSpaceID" element={<BoardView />} />
            <Route
              path="/calendarview/:workSpaceID"
              element={<WorkSpaceCalendarView />}
            />
            <Route
              path="/listview/:workSpaceID"
              element={<WorkSpaceListView />}
            />
            <Route path="/mytasks" element={<MyTasks />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
      </DndProvider>
    </>
  );
}

export default App;
