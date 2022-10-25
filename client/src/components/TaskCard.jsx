import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import MoreMenu from "./MoreMenu";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useState } from "react";
import dayjs from "dayjs";
import { dueDate } from "../services/dueDate";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { updateTask } from "../features/task/taskSlice";
import { useDispatch } from "react-redux";

function TaskCard({ taskItem }) {
  const dispatch = useDispatch();
  const [isReadMore, setIsReadMore] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    name: taskItem.name,
  });
  const { name } = updateFormData;

  const onFormChange = (e) => {
    setUpdateFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleFormOpen = () => {
    setShowUpdateForm(true);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    const taskInfo = { ...taskItem };
    taskInfo.name = name;
    console.log(taskInfo);
    const taskID = taskItem._id;
    dispatch(updateTask({ taskID, taskInfo }));
    setShowUpdateForm(false);
  };
  const title = (
    <Typography variant="h6" component="div" textAlign={"left"}>
      {taskItem.taskName}
    </Typography>
  );

  return (
    <>
      <Card
        sx={{
          marginBottom: "25px",
          borderRadius: "10px",
          maxWidth: "500px",
        }}
      >
        <CardHeader
          sx={{ marginBottom: "-25px" }}
          action={
            <IconButton aria-label="settings">
              <MoreMenu item={taskItem} />
            </IconButton>
          }
          title={title}
        ></CardHeader>
        <CardContent>
          <Typography variant="body2" textAlign={"left"}>
            {!isReadMore && taskItem.description.length > 150
              ? taskItem.description.slice(0, 150) + "... "
              : taskItem.description}
          </Typography>
          <br />
          <Stack direction="row" spacing={1}>
            {taskItem.tags
              ? taskItem.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    variant="outlined"
                    size="small"
                  />
                ))
              : null}
          </Stack>
        </CardContent>
        <Divider />
        <CardActions disableSpacing>
          {taskItem.description.length > 150 && (
            <Button size="small" onClick={() => setIsReadMore(!isReadMore)}>
              {isReadMore ? "Show Less" : "Read More"}
            </Button>
          )}
          {taskItem.dueDate ? (
            <IconButton size="small" sx={{ marginLeft: "auto" }}>
              <CalendarMonthOutlinedIcon
                sx={{ height: "20px", marginTop: "-5px" }}
              />
              <Tooltip
                title={`Due ${dayjs(taskItem.dueDate).format(`MM/DD/YYYY`)}`}
              >
                <Typography variant="overline" display="block" gutterBottom>
                  {dueDate(taskItem.dueDate)}
                </Typography>
              </Tooltip>
            </IconButton>
          ) : null}
        </CardActions>
      </Card>
      <Dialog open={showUpdateForm}>
        <DialogTitle>Let's Create a Workspace</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out this form to create a workspace
          </DialogContentText>
          {
            //! add update task form
          }
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TaskCard;
