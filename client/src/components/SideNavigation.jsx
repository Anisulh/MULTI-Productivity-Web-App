import { useState } from "react";
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import QueueListIcon from "@heroicons/react/24/outline/QueueListIcon";
import { useNavigate, useParams } from "react-router-dom";
import ChevronLeftIcon from "@heroicons/react/24/outline/ChevronLeftIcon";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import WorkSpaceForm from "./forms/WorkSpaceForm";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { reset as authReset } from "../features/auth/authSlice";

const navRoutes = [
  { name: "Dashboard", icon: QueueListIcon, link: "/dashboard" },
  { name: "Calendar", icon: CalendarDaysIcon, link: "/calendar" },
];

function SideNavigation({ workSpaces }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { workSpaceID } = useParams();
  const [open, setOpen] = useState(true);
  const [workspaceDrop, setWorkspaceDrop] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  const handleFormClose = () => {
    setFormOpen(false);
  };
  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(authReset());
    navigate("/");
  };
  return (
    <div
      className={` ${
        open ? "w-56" : "w-20 "
      } border h-screen p-5 pt-8 relative  hidden sm:block duration-300 font-medium`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center" onClick={() => navigate("/dashboard")}>
        <img
          src="/logo.svg"
          alt="logo"
          className={`cursor-pointer duration-300 absolute ${
            open ? "h-20" : "h-10"
          }`}
        />
      </div>
      <ul className={`pt-6 ${open && "border-b border-slate-900 pb-6"} mt-3`}>
        {navRoutes.map((route) => (
          <li
            key={route.name}
            className="flex rounded-md p-2 cursor-pointer hover:bg-white   text-sm items-center gap-x-4 "
            onClick={() => navigate(route.link)}
          >
            <route.icon className="h-5 w-5 text-gray-500" />
            <span className={`${!open && "hidden"} origin-left duration-300`}>
              {route.name}
            </span>
          </li>
        ))}
      </ul>
      <div
        className={`flex items-center justify-between mt-2 ${
          open ? "block" : "hidden"
        }`}
      >
        <h2 className="flex-1">Workspaces</h2>
        <button
          className=" mr-2 rounded-md border hover:bg-indigo-600"
          onClick={handleFormOpen}
        >
          <PlusIcon className="h-4 w-4 hover:text-white" />
        </button>
        {workspaceDrop ? (
          <ChevronDownIcon
            className="h-4 cursor-pointer text-gray-500 hover:bg-indigo-600 hover:text-white rounded-md"
            onClick={() => {
              setWorkspaceDrop(!workspaceDrop);
            }}
          />
        ) : (
          <ChevronLeftIcon
            className="h-4 cursor-pointer text-gray-500 hover:bg-indigo-600 hover:text-white rounded-md"
            onClick={() => {
              setWorkspaceDrop(!workspaceDrop);
            }}
          />
        )}
      </div>
      <div>
        {open &&
          workspaceDrop &&
          (workSpaces && workSpaces.length > 0 ? (
            workSpaces?.map((space) => {
              if(workSpaceID && space._id === workSpaceID){
                return (
                  <div
                    key={space._id}
                    className="flex items-center justify-start w-full rounded-md px-2 cursor-pointer bg-indigo-600 text-white"
                    onClick={() => navigate(`/workspaces/${space._id}`)}
                  >
                    <div
                      className="h-2 w-2  rounded-full mx-2"
                      style={{ backgroundColor: space.color }}
                    ></div>
                    <h2 className="text-sm">
                      {space.name.length > 16
                        ? space.name.substring(0, 15) + "..."
                        : space.name}
                    </h2>
                  </div>
                );

              } else{
                return (
                <div
                  key={space._id}
                  className="flex items-center justify-start w-full rounded-md px-2 cursor-pointer hover:bg-indigo-600 hover:text-white"
                  onClick={() => navigate(`/workspaces/${space._id}`)}
                >
                  <div
                    className="h-2 w-2  rounded-full mx-2"
                    style={{ backgroundColor: space.color }}
                  ></div>
                  <h2 className="text-sm font-medium">
                    {space.name.length > 16
                      ? space.name.substring(0, 15) + "..."
                      : space.name}
                  </h2>
                </div>
              );
              }
              
            })
          ) : (
            <h2 className="text-sm font-medium">No workspaces to show</h2>
          ))}
      </div>

      <div className=" absolute bottom-5 w-44 justify-center items-center ">
        <button
          className={`flex rounded-md text-sm hover:bg-indigo-600 hover:text-white  items-center p-2 duration-300 ${
            open && "justify-around w-full border"
          }`}
          onClick={onLogout}
        >
          <span className="sr-only">Logout</span>

          {open && <h4 className="text-lg font-medium"> Logout</h4>}
        </button>
      </div>
      <div
        className={`absolute top-0 left-0 flex items-center h-screen w-screen justify-center backdrop-brightness-50 z-50 ${
          formOpen ? "block" : "hidden"
        }`}
      >
        <WorkSpaceForm handleClose={handleFormClose} />
      </div>
    </div>
  );
}

export default SideNavigation;
