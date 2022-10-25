import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllTasks } from "../features/task/taskSlice";
import Spinner from "../components/Spinner";
import Stack  from "@mui/material/Stack";
import { getWorkSpaces } from "../features/workSpace/workSpaceSlice";
import WorkSpaceCard from "../components/WorkSpaceCard";
import TaskCard from "../components/TaskCard";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.task
  );
  const { workSpaces } = useSelector((state) => state.workSpace);
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/");
    }
    dispatch(getAllTasks());
    dispatch(getWorkSpaces());
  }, [dispatch, isError, message, navigate, user]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Box ml={{xs: 2, sm: 6, md: 12}} mt={2} mr={{xs: 2, sm: 6, md: 12}} mb={6}>
      <Typography variant="h5">
        Welcome, {user ? user.firstName : null}
      </Typography>
      <Typography variant="h6" mt={1}>Your WorkSpaces</Typography>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={3}
        mt={3}
      >
        {workSpaces
          ? workSpaces?.map((workSpace) => {
              return (
                <WorkSpaceCard key={workSpace._id} workSpace={workSpace} />
              );
            })
          : "No Workspaces"}
      </Stack>
      <Typography variant="h6" mt={3}>Your Tasks</Typography>
      <Box ml={{xs: 2, sm: 4, md: 6}} mt={2} mr={{xs: 2, sm: 4, md: 6}}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          sx={{ marginRight: "auto", marginLeft: "auto" }}
        >
          {tasks
            ? tasks?.map((task) => {
                return <TaskCard key={task._id} taskItem={task} />;
              })
            : "No Tasks"}
        </Stack>
      </Box>
    </Box>
  );
}

export default Home;
