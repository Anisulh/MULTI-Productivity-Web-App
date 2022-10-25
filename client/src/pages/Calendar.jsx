import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTasks } from "../features/task/taskSlice";
import Spinner from "../components/Spinner";
import TaskCard from "../components/TaskCard";
import Typography  from "@mui/material/Typography";
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box";
import { PickersDay } from "@mui/x-date-pickers";

export default function Calendar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentDate = dayjs().format("MM/DD/YYYY").toString();
  const [date, setDate] = useState(dayjs(currentDate));
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.task
  );
  const datedTasks = tasks?.filter((task) => {
    return task.dueDate;
  });
  const unformattedDate = new Date(date);
  const correctTasks = datedTasks?.filter(
    (task) => dayjs(task.dueDate).$d.getTime() === unformattedDate.getTime()
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/");
    }
    dispatch(getAllTasks());
  }, [dispatch, isError, message, navigate, user]);

  if (isLoading) {
    return <Spinner />;
  }

  const renderTaskFrequency = (date, selectedDates, pickersDayProps) => {
    const formattedDate = new Date(date);
    const matchedStyles =
      datedTasks.length > 0 &&
      datedTasks?.reduce((acc, task) => {
        return dayjs(task.dueDate).$d.getTime() === formattedDate.getTime()
          ? {
              height: 0,
              width: 0,
              border: "2px solid red",
              borderRadius: "50%",
              transform: "translate(18px, -8px)",
            }
          : acc;
      }, {});

    return (
      <Box className="dayWithDotContainer">
        <PickersDay {...pickersDayProps} />
        <Box sx={{ ...matchedStyles }} />
      </Box>
    );
  };

  return (
    <Box ml={{xs: 2, sm: 6, md: 12}} mt={2} mr={{xs: 2, sm: 6, md: 12}} mb={6}>
      <Typography variant="h5">Calendar View</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid item xs={12} md={6}>
          <CalendarPicker
            date={date}
            renderDay={renderTaskFrequency}
            onChange={(newDate) => {
              setDate(newDate);
            }}
          />
        </Grid>
      </LocalizationProvider>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{ marginRight: "auto", marginLeft: "auto" }}
      >
        {correctTasks.length === 0 ? (
          <p>No tasks on this date</p>
        ) : (
          correctTasks?.map((task) => {
            return <TaskCard key={task._id} taskItem={task} />;
          })
        )}
      </Stack>
      <div className="dot"> </div>
    </Box>
  );
}
