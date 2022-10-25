import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getList } from "../features/list/listSlice";
import Box from "@mui/material/Box";
import { getTasks, reset } from "../features/task/taskSlice";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ListPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { workSpaceID, listID } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { tasks, isError, isLoading, message } = useSelector(
    (state) => state.task
  );
  const { lists } = useSelector((state) => state.list);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    const data = { workSpaceID, listID };
    dispatch(getList(data));
    dispatch(getTasks(data));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, listID, user, navigate, workSpaceID]);

  const [taskOpen, setTaskOpen] = useState(false);
  const handleTaskOpen = () => {
    setTaskOpen(true);
  };
  const handleTaskClose = () => {
    setTaskOpen(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box ml={{xs: 2, sm: 6, md: 12}} mt={2} mr={{xs: 2, sm: 6, md: 12}} mb={6}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h1>{lists.name}</h1>
        <div>
          <h2>Active Tasks:</h2>
          {tasks.length > 0 ? (
            <List>
              {tasks.map((taskItem) => (
                <TaskCard key={taskItem._id} taskItem={taskItem} />
              ))}
            </List>
          ) : (
            <h3>No active Tasks</h3>
          )}
        </div>
      </Grid>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          key="Add Task"
          icon={<FormatListBulletedRoundedIcon />}
          tooltipTitle="Add Task"
          onClick={handleTaskOpen}
        />
      </SpeedDial>
      <Dialog open={taskOpen} onClose={handleTaskClose}>
        <DialogTitle>Let's Add a Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out this form to add a task.
          </DialogContentText>
          <TaskForm lists={lists} handleTaskClose={handleTaskClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ListPage;
