import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getWorkSpaces } from "../features/workSpace/workSpaceSlice";
import WorkSpaceCard from "../components/WorkSpaceCard";
import Spinner from "../components/Spinner";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import MobileNav from "../components/MobileNav";
import SideNavigation from "../components/SideNavigation";
import { getAllTasks } from "../features/task/taskSlice";
import startOfToday from "date-fns/startOfToday";
import TaskCard from "../components/TaskCard";
import WorkSpaceForm from "../components/forms/WorkSpaceForm";
import Tooltip from "../components/ToolTip";
import parse from "date-fns/parse";
import isAfter from "date-fns/isAfter";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { workSpaces, isLoading, isError, message } = useSelector(
    (state) => state.workSpace
  );
  const { tasks } = useSelector((state) => state.task);
  const upcomingTasks = tasks?.filter((task) => {
    return isAfter(
      parse(
        task?.dueDate?.substring(0, 10).replace(/-/g, "/"),
        "yyyy/MM/dd",
        new Date()
      ),
      startOfToday()
    );
  });

  const [formOpen, setFormOpen] = useState(false);
  const handleClose = () => {
    setFormOpen(false);
  };
  const handleOpen = () => {
    setFormOpen(true);
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (isError) {
      console.log(message);
    }
    dispatch(getWorkSpaces());
    dispatch(getAllTasks());
  }, [dispatch, isError, message, navigate, user]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <MobileNav />
      <div className="flex sm:overflow-hidden">
        <SideNavigation workSpaces={workSpaces} />
        <div className="h-screen flex-1 p-7">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <h2 className="text-xl mt-10 -mb-10 font-medium">
            Welcome, {user?.firstName}
          </h2>
          <div className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-14 lg:mt-16 lg:px-8 xl:mt-20">
            <h2 className="text-2xl font-semibold">Workspaces</h2>
            <div className="pb-5 sm:h-36 sm:overflow-auto">
              {workSpaces.length > 0 ? (
                workSpaces.map((workSpace) => {
                  return (
                    <WorkSpaceCard workSpace={workSpace} key={workSpace._id} />
                  );
                })
              ) : (
                <p>No workspaces to show</p>
              )}
            </div>
          </div>
          <div className="mx-auto mt-8 max-w-7xl px-4 sm:mt-10 sm:px-6 md:mt-12  lg:px-8 ">
            <h2 className="text-2xl font-semibold">Upcoming Tasks</h2>
            <div className="pb-5 sm:h-96 sm:overflow-auto">
              {upcomingTasks.length > 0 ? (
                upcomingTasks.map((task) => {
                  return <TaskCard task={task} key={task._id} />;
                })
              ) : (
                <p>No upcoming tasks</p>
              )}
            </div>
          </div>
          <Tooltip message={"Create workspace"}>
            <button
              className=" fixed bottom-5 right-5 md:right-10 md:bottom-10 p-3 rounded-full border bg-indigo-600 text-white hover:bg-indigo-400"
              onClick={handleOpen}
            >
              <PlusIcon className="h-6 w-6" />
            </button>
          </Tooltip>

          <div
            className={`absolute top-0 left-0 flex items-center h-screen w-screen justify-center backdrop-brightness-50 ${
              formOpen ? "block" : "hidden"
            }`}
          >
            <WorkSpaceForm handleClose={handleClose} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
