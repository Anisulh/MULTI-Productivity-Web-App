import { Fragment, useState } from "react";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import TaskCard from "./TaskCard";
import { Menu, Transition } from "@headlessui/react";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import TaskForm from "./forms/TaskForm";
import ListForm from "./forms/ListForm";
import { deleteList } from "../features/list/listSlice";
import { useDispatch } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ListColumn({ list, tasks }) {
  const dispatch = useDispatch();
  const listTasks = tasks.filter((task) => task.list === list._id);
  const [formOpen, setFormOpen] = useState(false);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const handleTaskClose = () => {
    setTaskFormOpen(false);
  };
  const handleTaskOpen = () => {
    setTaskFormOpen(true);
  };
  const handleClose = () => {
    setFormOpen(false);
  };
  const handleOpen = () => {
    setFormOpen(true);
  };
  const onDelete = () => {
    const listData = {
      workSpaceID: list.workSpace,
      listID: list._id,
    };
    dispatch(deleteList(listData));
  };
  const options = [
    { name: "Edit", icon: PencilSquareIcon, function: handleOpen },
    { name: "Delete", icon: TrashIcon, function: onDelete },
  ];
  return (
    <div className="mx-2">
      <div className="h-full mt-2 px-4 sm:px-6  lg:px-8  pt-4  w-96  ">
        <Menu as="div" className="relative ">
          <div className="flex w-full justify-between">
            <div className="flex justify-start items-center">
              <div
                className="border w-2 rounded h-5 mr-1"
                style={{ backgroundColor: list.color }}
              ></div>
              <h3 className="font-medium text-lg ">{list.name}</h3>
            </div>

            <Menu.Button className=" rounded-md  border-gray-300 bg-white  text-lg font-medium text-gray-700 shadow-sm  ">
              <EllipsisVerticalIcon
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
            <Menu.Items className="absolute right-0 z-1 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
        <div className="border -mx-2 "></div>

        <div className="flex items-center justify-center p-4  ">
          <button
            className="border-2 border-dashed rounded w-full flex items-center justify-center p-3 hover:bg-blue-50"
            onClick={handleTaskOpen}
          >
            <PlusIcon className="h-7" />
          </button>
        </div>
        <div className="overflow-auto h-3/4">
          {listTasks.length > 0 ? (
            listTasks.map((task) => {
              return <TaskCard task={task} key={task._id} />;
            })
          ) : (
            <p>No tasks to show</p>
          )}
        </div>
      </div>
      <div
        className={`absolute top-0 left-0 flex items-center h-screen w-screen justify-center backdrop-brightness-50 z-50 ${
          formOpen ? "block" : "hidden"
        }`}
      >
        <ListForm list={list} handleClose={handleClose} update={true} />
      </div>
      <div
        className={`absolute top-0 left-0 flex items-center h-screen w-screen justify-center backdrop-brightness-50 z-50 ${
          taskFormOpen ? "block" : "hidden"
        }`}
      >
        <TaskForm list={list._id} handleClose={handleTaskClose} />
      </div>
    </div>
  );
}

export default ListColumn;
