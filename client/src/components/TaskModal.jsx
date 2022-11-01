import parseISO from "date-fns/parseISO";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { Menu, Transition } from "@headlessui/react";
import ChevronDownIcon from "@heroicons/react/20/solid/ChevronDownIcon";
import { Fragment, useState } from "react";
import TaskForm from "./forms/TaskForm";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/task/taskSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function TaskModal({ task, lists, setSelectedTask }) {
  const dispatch = useDispatch();
  const { taskName, description, list, dueDate, tags } = task;
  const parsedDate = parseISO(dueDate);
  const [formOpen, setFormOpen] = useState(false);
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
    setSelectedTask(null);
  };
  const listName = lists.filter((item) => item._id === list)[0].name;
  const options = [
    { name: "Edit", icon: PencilSquareIcon, function: handleOpen },
    { name: "Delete", icon: TrashIcon, function: onDelete },
  ];
  return (
    <div className="border rounded-xl py-5 sm:pt-5 px-5 h-5/6 ml-10 sm:ml-5 ">
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
      <div className="flex items-center justify-start border-b">
        <h4 className="font-medium border-b px-4 py-2">List:</h4>
        <p className="text-sm">{listName}</p>
      </div>
      <div className="flex items-center justify-start border-b">
        <h4 className="font-medium border-b px-4 py-2">Due Date:</h4>
        <p className="text-sm">
          {parsedDate.toString().split(" ").slice(1, 4).join(" ")}
        </p>
      </div>
      <div className="flex items-center justify-start border-b">
        <h4 className="font-medium  px-4 py-2">Tags:</h4>
        {tags?.map((tag) => {
          return (
            <button
              key={tag}
              className="border-1 rounded-md bg-rose-200 px-2 p-1 text-xs  mx-2"
            >
              {tag}
            </button>
          );
        })}
      </div>

      <h4 className="font-medium px-4 py-2">Description </h4>
      <p className="text-sm  px-4 py-2">{description}</p>
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

export default TaskModal;
