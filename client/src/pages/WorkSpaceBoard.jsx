import ListForm from "../components/forms/ListForm";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MobileNav from "../components/MobileNav";
import Spinner from "../components/Spinner";
import {
  getWorkSpace,
  getWorkSpaces,
} from "../features/workSpace/workSpaceSlice";
import ListColumn from "../components/ListColumn";
import { getLists } from "../features/list/listSlice";
import { getWorkSpaceTasks } from "../features/task/taskSlice";
import SideNavigation from "../components/SideNavigation";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import Tooltip from "../components/ToolTip";

function WorkSpaceBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { workSpaceID } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { lists } = useSelector((state) => state.list);
  const { workSpaces } = useSelector((state) => state.workSpace);
  const { tasks, isError, isLoading, message } = useSelector(
    (state) => state.task
  );
  const [formOpen, setFormOpen] = useState(false);
  const handleOpen = () => {
    setFormOpen(true);
  };
  const handleClose = () => {
    setFormOpen(false);
  };
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getWorkSpaces());
    dispatch(getWorkSpace(workSpaceID));
    dispatch(getLists(workSpaceID));
    dispatch(getWorkSpaceTasks(workSpaceID));
  }, [dispatch, isError, message, user, navigate, workSpaceID]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <MobileNav />
      <div className="flex ">
        <SideNavigation workSpaces={workSpaces} />
        <div className="h-screen flex-1 sm:overflow-hidden">
          <div className="w-full border flex items-center p-5 ">
            <Link
              to={`/workspaces/${workSpaceID}/list`}
              className="px-5 text-md font-medium hover:text-indigo-600"
            >
              List View
            </Link>
            <Link
              to={`/workspaces/${workSpaceID}`}
              className="px-5 text-md font-medium hover:text-indigo-600"
            >
              Board View
            </Link>
          </div>
          <div className="p-7 h-screen">
            <h1 className="text-2xl font-bold">Workspace: BoardView</h1>
            <div className=" sm:flex height-85 overflow-y-hidden z-50">
              {lists?.map((list) => {
                return <ListColumn key={list._id} list={list} tasks={tasks} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <Tooltip message={"Add list"}>
        <button
          className=" absolute bottom-5 right-5 md:right-10 md:bottom-10 p-3 rounded-full border bg-indigo-600 text-white hover:bg-indigo-400"
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
        <ListForm handleClose={handleClose} />
      </div>
    </div>
  );
}

export default WorkSpaceBoard;
