import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import parseISO from "date-fns/parseISO";
import { Fragment, useState } from "react";
import TaskForm from "./forms/TaskForm";
import { Menu, Transition } from "@headlessui/react";
import ChevronDownIcon from "@heroicons/react/20/solid/ChevronDownIcon";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../features/task/taskSlice";
import { parse } from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function TaskCard({ task }) {
  const dispatch = useDispatch();
  const { taskName, description, dueDate, tags } = task;
  const newDate = dueDate?.substring(0, 10).replace(/-/g, "/");
  const parsedDate = parse(newDate, "yyyy/MM/dd", new Date());
  const [isReadMore, setIsReadMore] = useState(description.length > 150);
  const [formOpen, setFormOpen] = useState(false);
  const { lists } = useSelector((state) => state.list);
  const handleClose = () => {
    setFormOpen(false);
  };
  const handleOpen = () => {
    setFormOpen(true);
  };
  const onDelete = () => {
    const taskData = {
      workSpaceID: task.workSpace,
      listID: task.list,
      taskID: task._id,
    };
    dispatch(deleteTask(taskData));
  };

  const options = [
    { name: "Edit", icon: PencilSquareIcon, function: handleOpen },
    { name: "Delete", icon: TrashIcon, function: onDelete },
  ];
  return (
    <div className="border rounded-xl pt-5 px-5 mb-5 z-0">
      <Menu as="div" className="relative ">
        <div className="text-lg font-medium flex w-full justify-between">
          <h3>{taskName}</h3>
          <Menu.Button className=" rounded-md  border-gray-300 bg-white  text-lg font-medium text-gray-700 shadow-sm  ">
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5 rounded-full hover:bg-gray-200"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {options?.map((item) => {
                return (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <button
                        onClick={item.function}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "px-4 py-2 text-sm flex items-center w-full"
                        )}
                      >
                        <item.icon className="h-4 mr-2" />
                        {item.name}
                      </button>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <p className="text-sm">
        {isReadMore ? description.substring(0, 150) + "..." : description}
      </p>
      {description.length > 150 ? (
        isReadMore ? (
          <button
            className="text-indigo-500 hover:text-indigo-800 p-2 rounded pl-0"
            onClick={() => setIsReadMore(false)}
          >
            Read More
          </button>
        ) : (
          <button
            className="text-indigo-500 hover:text-indigo-800 p-2 rounded pl-0"
            onClick={() => setIsReadMore(true)}
          >
            Read less
          </button>
        )
      ) : null}

      <div className="px-2 mt-5">
        {tags?.map((tag) => {
          return (
            <button
              className="border-1 rounded-md bg-indigo-200 px-2 p-1 text-xs  mx-2"
              key={tag}
            >
              {tag}
            </button>
          );
        })}
      </div>
      <div className="border mt-2"></div>
      <div className="flex items-center justify-between py-3">
        {dueDate && (
          <>
            <p className="text-sm">Due Date:</p>
            <p className="text-sm">
              {parsedDate.toString().split(" ").slice(1, 4).join(" ")}
            </p>
          </>
        )}
      </div>
      <div
        className={`absolute z-50 top-0 left-0 flex items-center h-screen w-screen justify-center backdrop-brightness-50 ${
          formOpen ? "block" : "hidden"
        }`}
      >
        <TaskForm
          task={task}
          lists={lists}
          handleClose={handleClose}
          update={true}
        />
      </div>
    </div>
  );
}

export default TaskCard;
