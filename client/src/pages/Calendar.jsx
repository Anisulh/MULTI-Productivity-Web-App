import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTasks } from "../features/task/taskSlice";
import Spinner from "../components/Spinner";
import TaskCard from "../components/TaskCard";
import startOfToday from "date-fns/startOfToday";
import add from "date-fns/add";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import endOfMonth from "date-fns/endOfMonth";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import isEqual from "date-fns/isEqual";
import isSameDay from "date-fns/isSameDay";
import isSameMonth from "date-fns/isSameMonth";
import isToday from "date-fns/isToday";
import parse from "date-fns/parse";
import parseISO from "date-fns/parseISO";
import MobileNav from "../components/MobileNav";
import SideNavigation from "../components/SideNavigation";
import ChevronRightIcon from "@heroicons/react/24/outline/ChevronRightIcon";
import ChevronLeftIcon from "@heroicons/react/24/outline/ChevronLeftIcon";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import { getAllLists } from "../features/list/listSlice";
import GeneralTaskForm from "../components/forms/GeneralTaskForm";
import { getWorkSpaces } from "../features/workSpace/workSpaceSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export default function Calendar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.task
  );
  const { workSpaces } = useSelector((state) => state.workSpace);
  const { lists } = useSelector((state) => state.list);
  const [formOpen, setFormOpen] = useState(false);
  const handleClose = () => {
    setFormOpen(false);
  };
  const handleOpen = () => {
    setFormOpen(true);
  };
  const [selectedDay, setSelectedDay] = useState(startOfToday());
  const [currentMonth, setCurrentMonth] = useState(
    format(startOfToday(), "MMM-yyyy")
  );
  const [date, setDate] = useState(selectedDay);
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/");
    }
    dispatch(getWorkSpaces());
    dispatch(getAllTasks());
    dispatch(getAllLists());
    setDate(selectedDay);
  }, [dispatch, isError, message, navigate, selectedDay, user]);

  if (isLoading) {
    return <Spinner />;
  }
  const today = startOfToday();

  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  const selectedDayTasks = tasks?.filter((task) =>
    isSameDay(parseISO(task.dueDate), selectedDay)
  );

  return (
    <div>
      <MobileNav />
      <div className="flex sm:overflow-hidden ">
        <SideNavigation workSpaces={workSpaces} />
        <div className="h-screen flex-1">
          <div className="p-7 h-screen">
            <h1 className="text-2xl font-bold mt-10">Calendar</h1>
            <div className="pt-16">
              <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-7xl md:px-6">
                <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
                  <div className="md:pr-14">
                    <div className="flex items-center border-b">
                      <h2 className="flex-auto font-semibold text-gray-900">
                        {format(firstDayCurrentMonth, "MMMM yyyy")}
                      </h2>
                      <button
                        className="hover:text-gray-500"
                        onClick={() => {
                          setSelectedDay(today);
                          setCurrentMonth(format(today, "MMM-yyyy"));
                        }}
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        onClick={previousMonth}
                        className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Previous month</span>
                        <ChevronLeftIcon
                          className="w-5 h-5"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        onClick={nextMonth}
                        type="button"
                        className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Next month</span>
                        <ChevronRightIcon
                          className="w-5 h-5"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                      <div>S</div>
                      <div>M</div>
                      <div>T</div>
                      <div>W</div>
                      <div>T</div>
                      <div>F</div>
                      <div>S</div>
                    </div>
                    <div className="grid grid-cols-7 mt-2 text-sm">
                      {days.map((day, dayIdx) => (
                        <div
                          key={day.toString()}
                          className={classNames(
                            dayIdx === 0 && colStartClasses[getDay(day)],
                            "py-1.5 border-b"
                          )}
                        >
                          <button
                            type="button"
                            onClick={() => setSelectedDay(day)}
                            className={classNames(
                              isEqual(day, selectedDay) && "text-white",
                              !isEqual(day, selectedDay) &&
                                isToday(day) &&
                                "text-red-500",
                              !isEqual(day, selectedDay) &&
                                !isToday(day) &&
                                isSameMonth(day, firstDayCurrentMonth) &&
                                "text-gray-900",
                              !isEqual(day, selectedDay) &&
                                !isToday(day) &&
                                !isSameMonth(day, firstDayCurrentMonth) &&
                                "text-gray-400",
                              isEqual(day, selectedDay) &&
                                isToday(day) &&
                                "bg-blue-500",
                              isEqual(day, selectedDay) &&
                                !isToday(day) &&
                                "bg-gray-900",
                              !isEqual(day, selectedDay) && "hover:bg-gray-200",
                              (isEqual(day, selectedDay) || isToday(day)) &&
                                "font-semibold",
                              "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                            )}
                          >
                            <time dateTime={format(day, "yyyy-MM-dd")}>
                              {format(day, "d")}
                            </time>
                          </button>

                          <div className="w-1 h-1 mx-auto mt-1">
                            {tasks.some((task) =>
                              isSameDay(parseISO(task.dueDate), day)
                            ) && (
                              <div className="w-1 h-1 rounded-full bg-red-500"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <section className="mt-12 md:mt-0 md:pl-14">
                    <div className="flex items-center justify-between">
                      <h2 className="font-semibold text-gray-900">
                        Schedule for{" "}
                        <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                          {format(selectedDay, "MMM dd, yyy")}
                        </time>
                      </h2>
                      {selectedDay > today && (
                        <PlusIcon
                          className="h-5 cursor-pointer hover:bg-indigo-600 hover:text-white rounded-full"
                          onClick={handleOpen}
                        />
                      )}
                    </div>

                    <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                      {selectedDayTasks.length > 0 ? (
                        selectedDayTasks.map((task) => (
                          <TaskCard task={task} key={task.id} />
                        ))
                      ) : (
                        <p>No tasks for today.</p>
                      )}
                    </ol>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`absolute z-50 top-0 left-0 flex items-center h-screen w-screen justify-center backdrop-brightness-50 ${
            formOpen ? "block" : "hidden"
          }`}
        >
          <GeneralTaskForm
            lists={lists}
            workSpaces={workSpaces}
            handleClose={handleClose}
            date={date}
          />
        </div>
      </div>
    </div>
  );
}
