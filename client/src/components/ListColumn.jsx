import React, { useCallback } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import TaskCard from "./TaskCard";
import Box from "@mui/material/Box";
import MoreMenu from "./MoreMenu";

function ListColumn({ list, tasks }) {
  const listTasks = tasks.filter((task) => task.list === list._id);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const renderCard = useCallback((taskItem, index) => {
    return <TaskCard key={taskItem._id} taskItem={taskItem} index={index} />;
  }, []);

  return (
    <Grid xs={2} sm={4} md={4} sx={{ overflowY: "auto", maxHeight: "100vh" }}>
      <Item elevation={0}>
        <Box
          sx={{
            borderBottom: `2px solid ${list.color}`,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="subtitle1"
            textAlign={"left"}
            sx={{
              fontWeight: 700,
            }}
          >
            {list.name}
          </Typography>
          <MoreMenu item={list} />
        </Box>

        {listTasks.length > 0 ? (
          <List sx={{ padding: "10px" }}>
            {listTasks.map((taskItem, index) => renderCard(taskItem, index))}
          </List>
        ) : (
          <h3>No active Tasks</h3>
        )}
      </Item>
    </Grid>
  );
}

export default ListColumn;
