import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { getWorkSpaceTasks } from "../features/task/taskSlice";
import { getLists } from "../features/list/listSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getWorkSpace,
  getWorkSpaces,
} from "../features/workSpace/workSpaceSlice";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import ChevronLeftIcon from "@heroicons/react/24/outline/ChevronLeftIcon";
import MobileNav from "../components/MobileNav";
import SideNavigation from "../components/SideNavigation";
import TaskModal from "../components/TaskModal";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import ListTaskForm from "../components/forms/ListTaskForm";
import Tooltip from "../components/ToolTip";

function List({ list, tasks, setSelectedTask }) {
  const [listDrop, setListDrop] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between p-1 px-3 ml-5 border-b">
        <h2
          className="flex-1 cursor-pointer"
          onClick={() => {
            setListDrop(!listDrop);
          }}
        >
          {list.name}
        </h2>
        {listDrop ? (
          <ChevronDownIcon
            className="h-4 cursor-pointer"
            onClick={() => {
              setListDrop(!listDrop);
            }}
          />
        ) : (
          <ChevronLeftIcon
            className="h-4 cursor-pointer"
            onClick={() => {
              setListDrop(!listDrop);
            }}
          />
        )}
      </div>
      {listDrop &&
      <div>{tasks.length > 0 ? tasks.map((task) => {
          return (
            <Task
              task={task}
              setSelectedTask={setSelectedTask}
              key={task._id}
            />
          );
        }): <p className="p-1 px-3 ml-5">No tasks in list</p>}</div>
        }
    </div>
  );
}

function Task({ task, setSelectedTask }) {
  return (
    <h4
      className="flex items-center justify-between p-1 px-3 ml-10 border-b cursor-pointer"
      onClick={() => {
        setSelectedTask(task);
      }}
    >
      {task.taskName}
    </h4>
  );
}

function Workspace({ workSpace, lists, tasks, setSelectedTask }) {
  const [workspaceDrop, setWorkspaceDrop] = useState(true);
  return (
    <div className="w-full mb-5 ">
      <div
        className="flex items-center justify-between w-full p-1 px-3
                   border-b font-medium"
      >
        <h2
          className="flex-1 cursor-pointer text-lg"
          onClick={() => {
            setWorkspaceDrop(!workspaceDrop);
          }}
        >
          {workSpace.name}
        </h2>
        {workspaceDrop ? (
          <ChevronDownIcon
            className="h-4 cursor-pointer"
            onClick={() => {
              setWorkspaceDrop(!workspaceDrop);
            }}
          />
        ) : (
          <ChevronLeftIcon
            className="h-4 cursor-pointer"
            onClick={() => {
              setWorkspaceDrop(!workspaceDrop);
            }}
          />
        )}
      </div>
      {workspaceDrop && (
        <div>
          {lists.length > 0 ? lists?.map((list) => {
            const listTasks = tasks.filter((task) => {
              return task.list === list._id;
            });
            return (
              <List
                key={list._id}
                list={list}
                tasks={listTasks}
                setSelectedTask={setSelectedTask}
              />
            );
          }) : <p className="p-1 px-3 ml-5">No lists in workspace</p>}
        </div>
      )}
    </div>
  );
}

export default function WorkSpaceList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { workSpaceID } = useParams();
  const { workSpaces, workSpace, isLoading, isError, message } = useSelector(
    (state) => state.workSpace
  );
  const { user } = useSelector((state) => state.auth);
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
  }, [dispatch, isError, message, navigate, user, workSpaceID]);
  const { lists } = useSelector((state) => state.list);
  const { tasks } = useSelector((state) => state.task);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const handleOpen = () => {
    setFormOpen(true);
  };
  const handleClose = () => {
    setFormOpen(false);
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <MobileNav />
      <div className="flex sm:overflow-hidden ">
        <SideNavigation workSpaces={workSpaces} />
        <div className="h-screen flex-1 ">
          <div className="w-full border flex items-center p-5 ">
            <Link
              to={`/workspaces/${workSpaceID}/list`}
              className="px-5 text-md font-medium hover:text-indigo-600 link-underline link-underline-black"
            >
              List View
            </Link>
            <Link
              to={`/workspaces/${workSpaceID}`}
              className="px-5 text-md font-medium hover:text-indigo-600 link-underline link-underline-black"
            >
              Board View
            </Link>
          </div>
          <div className="p-5 h-screen ">
            <h1 className="text-2xl font-bold">Workspace: ListView</h1>
            <div className=" sm:flex sm:justify-evenly sm:h-screen mt-5 max-w-7xl mx-auto">
              <div className=" w-full max-w-lg">
                <Workspace
                  workSpace={workSpace}
                  lists={lists}
                  tasks={tasks}
                  setSelectedTask={setSelectedTask}
                />
              </div>
              <div className="border h-5/6 mb-5"></div>
              <div className="max-w-sm w-full ">
                {selectedTask && (
                  <TaskModal
                    task={
                      tasks.filter((item) => item._id === selectedTask._id)[0]
                    }
                    setSelectedTask={setSelectedTask}
                    lists={lists}
                  />
                )}
              </div>
            </div>
          </div>
          <Tooltip message={"Add Task"}>
            <button
              className=" absolute bottom-5 right-5 md:right-10 md:bottom-10 p-3 rounded-full border bg-indigo-600 text-white hover:bg-indigo-400"
              onClick={handleOpen}
            >
              <PlusIcon className="h-6 w-6" />
            </button>
          </Tooltip>

          <div
            className={`absolute z-50 top-0 left-0 flex items-center h-screen w-screen justify-center backdrop-brightness-50 ${
              formOpen ? "block" : "hidden"
            }`}
          >
            <ListTaskForm lists={lists} handleClose={handleClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
