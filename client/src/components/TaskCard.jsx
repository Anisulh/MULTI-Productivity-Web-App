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
import { useSelector } from "react-redux";
import UpdateTaskForm from "./UpdateTaskForm";

function TaskCard({ taskItem }) {
  const [isReadMore, setIsReadMore] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { lists } = useSelector((state) => state.list);
  const handleFormOpen = () => {
    setShowUpdateForm(true);
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
              <MoreMenu item={taskItem} itemFormOpen={handleFormOpen} />
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
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill out this form to edit task</DialogContentText>
          <UpdateTaskForm
            lists={lists}
            taskItem={taskItem}
            setShowUpdateForm={setShowUpdateForm}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TaskCard;
