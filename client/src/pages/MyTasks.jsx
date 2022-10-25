import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import TaskCard from "../components/TaskCard";
import { getAllTasks } from "../features/task/taskSlice";

function MyTasks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.task
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

  return (
    <Box
      container
      ml={{ xs: 2, sm: 6, md: 12 }}
      mt={2}
      mr={{ xs: 2, sm: 6, md: 12 }}
      mb={6}
    >
      <Typography variant="h5" sx={{ marginBottom: "20px" }}>
        My Tasks
      </Typography>
      <Stack direction="column" justifyContent="center" alignItems="center">
        {tasks?.map((task) => {
          return <TaskCard key={task._id} taskItem={task} />;
        })}
      </Stack>
    </Box>
  );
}

export default MyTasks;
