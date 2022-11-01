//! workspace form is creating a new workspace when updating, but also updates the selected workspace but it needs to be refreshed to show change

import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import { Menu, Transition } from "@headlessui/react";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import WorkSpaceForm from "./forms/WorkSpaceForm";
import { deleteWorkSpace } from "../features/workSpace/workSpaceSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function WorkSpaceCard({ workSpace }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const { name, color } = workSpace;
  const handleClose = () => {
    setFormOpen(false);
  };
  const handleOpen = () => {
    setFormOpen(true);
  };
  const onDelete = () => {
    dispatch(deleteWorkSpace(workSpace._id))
  };

  const options = [
    { name: "Edit", icon: PencilSquareIcon, function: handleOpen },
    { name: "Delete", icon: TrashIcon, function: onDelete },
  ];

  return (
    <div className="flex items-center justify-between w-full border rounded-md hover:bg-indigo-600 hover:text-white">
      <Menu as="div" className="relative flex justify-start w-full">
        <div className="w-2" style={{ backgroundColor: color }}></div>
        <div className="text-lg font-medium w-full flex justify-between px-3">
          <h3 className="flex-1 cursor-pointer" onClick={() => {
            navigate(`/workspaces/${workSpace._id}`)
          }}>{name}</h3>
          <Menu.Button className=" rounded-md  border-gray-300  text-lg font-medium  shadow-sm  ">
            <EllipsisVerticalIcon
              className="-mr-1 ml-2 h-5 w-5 rounded-full"
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
      <div
        className={`absolute z-50 top-0 left-0 flex items-center h-screen w-screen justify-center backdrop-brightness-50 text-black ${
          formOpen ? "block" : "hidden"
        }`}
      >
        <WorkSpaceForm
          workSpace={workSpace}
          handleClose={handleClose}
          update={true}
        />
      </div>
    </div>
  );
}

export default WorkSpaceCard;
