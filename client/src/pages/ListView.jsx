import React, { useState } from "react";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { getAllTasks } from "../features/task/taskSlice";
import { getAllLists } from "../features/list/listSlice";
import { useNavigate } from "react-router-dom";
import { getWorkSpaces } from "../features/workSpace/workSpaceSlice";
import ListTree from "../components/ListTree";
import Typography from "@mui/material/Typography";
import TaskCard from "../components/TaskCard";
import Stack from "@mui/material/Stack";

export default function ListView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { workSpaces, isLoading, isError, message } = useSelector(
    (state) => state.workSpace
  );
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getWorkSpaces());
    dispatch(getAllLists());
    dispatch(getAllTasks());
  }, [dispatch, isError, message, navigate, user]);

  const { lists } = useSelector((state) => state.list);
  const { tasks } = useSelector((state) => state.task);
  const [showTask, setShowTask] = useState(null);
  let taskNode = {};
  const fetchSelected = (e, nodeID) => {
    if (nodeID in taskNode) {
      const showTaskItem = taskNode[nodeID];
      const taskItem = tasks.find((task) => task._id === showTaskItem);
      setShowTask(taskItem);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box
      ml={{ xs: 2, sm: 6, md: 12 }}
      mt={2}
      mr={{ xs: 2, sm: 6, md: 12 }}
      mb={6}
    >
      <Typography variant="h5" component="h2" mt={4}>
        ListView
      </Typography>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        onNodeSelect={(e, nodeId) => fetchSelected(e, nodeId)}
      >
        <ListTree
          workSpaces={workSpaces}
          tasks={tasks}
          lists={lists}
          taskNode={taskNode}
        />
      </TreeView>
      <Stack direction="column" justifyContent="center" alignItems="center">
        {showTask ? <TaskCard taskItem={showTask} /> : null}
      </Stack>
    </Box>
  );
}
