import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Spinner from "../components/Spinner";
import TaskForm from "../components/TaskForm";
import { getWorkSpace } from "../features/workSpace/workSpaceSlice";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import ListForm from "../components/ListForm";
import ListColumn from "../components/ListColumn";
import { getLists } from "../features/list/listSlice";
import { getWorkSpaceTasks } from "../features/task/taskSlice";

function BoardView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { workSpaceID } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { lists } = useSelector((state) => state.list);
  const { tasks, isError, isLoading, message } = useSelector(
    (state) => state.task
  );

  const { workSpace } = useSelector((state) => state.workSpace);

  const actions = [
    { icon: <FormatListBulletedRoundedIcon />, name: "Add List" },
    { icon: <TaskAltRoundedIcon />, name: "Add Task" },
  ];

  const [taskOpen, setTaskOpen] = useState(false);
  const handleTaskOpen = () => {
    setTaskOpen(true);
  };
  const handleTaskClose = () => {
    setTaskOpen(false);
  };

  const [listOpen, setListOpen] = useState(false);
  const handleListOpen = () => {
    setListOpen(true);
  };

  const handleListClose = () => {
    setListOpen(false);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }

    dispatch(getWorkSpace(workSpaceID));
    dispatch(getLists(workSpaceID));
    dispatch(getWorkSpaceTasks(workSpaceID));
  }, [dispatch, isError, message, user, navigate, workSpaceID]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Box
      ml={{ xs: 2, sm: 6, md: 8, lg: 12 }}
      mt={2}
      mr={{ xs: 2, sm: 6, md: 8, lg: 12 }}
      mb={6}
    >
      <Typography variant="h5">{workSpace.name}</Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 4, md: 12 }}
        sx={{ marginRight: "50px", marginLeft: "50px", marginTop: "10px" }}
      >
        {lists.length > 0 ? (
          lists.map((list) => (
            <ListColumn key={list._id} list={list} tasks={tasks} />
          ))
        ) : (
          <p>No lists, please create one</p>
        )}
      </Grid>

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={
              action.name === "Add List" ? handleListOpen : handleTaskOpen
            }
          />
        ))}
      </SpeedDial>
      <Dialog open={taskOpen} onClose={handleTaskClose}>
        <DialogTitle>Let's Add a Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out this form to add a task.
          </DialogContentText>
          <TaskForm
            workSpaceID={workSpaceID}
            lists={lists}
            handleTaskClose={handleTaskClose}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={listOpen} onClose={handleListClose}>
        <DialogTitle>Let's Add a Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out this form to create a List.
          </DialogContentText>
          <ListForm
            workSpaceID={workSpaceID}
            handleListClose={handleListClose}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default BoardView;
