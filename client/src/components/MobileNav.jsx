import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import QueueListIcon from "@heroicons/react/24/outline/QueueListIcon";
import { useState } from "react";
import { Link } from "react-router-dom";

const navRoutes = [
  { name: "Dashboard", icon: QueueListIcon, link: "/dashboard" },
  { name: "Calendar", icon: CalendarDaysIcon, link: "/calendar" },
];

function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="block sm:hidden -mt-3 ">
      <div className="w-full border px-3 ">
        <div>
          <div className="flex items-center justify-between duration-300">
            <Link
              to="/dashboard"
              className=" text-md font-medium flex items-center"
            >
              <img
                src="/logo.svg"
                className={"cursor-pointer h-20 "}
                alt="Logo"
              />
            </Link>
            <Bars3Icon
              className="h-6  hover:bg-indigo-600 hover:text-white rounded-md duration-300"
              onClick={() => setOpen(!open)}
            />
          </div>

          <div
            className={`py-5 px-2 ${open ? "block" : "hidden"} duration-300`}
          >
            {navRoutes.map((route) => {
              return (
                <Link
                  key={route.name}
                  to={route.link}
                  className="px-3 text-md font-medium flex items-center hover:bg-indigo-600 hover:text-white rounded-md"
                >
                  <route.icon className="px-2 h-8 w-8" />
                  {route.name}
                </Link>
              );
            })}
            <div className="border mt-5"></div>
            <div className="flex justify-center items-center ">
              <button
                className={`flex rounded-md text-sm hover:bg-indigo-600 hover:text-white hover:ring-2 hover:ring-white  items-center mx-10 py-2 mt-5 duration-300 ${
                  open ? "justify-evenly w-full border" : "hidden"
                }`}
              >
                <span className="sr-only">Logout</span>

                <h4 className="text-lg font-medium">Logout</h4>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
