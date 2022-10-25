import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  createWorkSpace,
  getWorkSpaces,
} from "../features/workSpace/workSpaceSlice";
import WorkSpaceCard from "../components/WorkSpaceCard";
import Spinner from "../components/Spinner";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import WorkSpaceForm from "../components/WorkSpaceForm";
import Stack  from "@mui/material/Stack";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { workSpaces, isLoading, isError, message } = useSelector(
    (state) => state.workSpace
  );

  const [formOpen, setFormOpen] = useState(false);
  const handleFormClose = () => {
    setFormOpen(false);
  };
  const handleFormOpen = () => {
    setFormOpen(true);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      console.log(message);
    }
    dispatch(getWorkSpaces());
  }, [dispatch, isError, message, navigate, user]);

  const [name, setName] = useState("");
  const onFormChange = (e) => {
    setName(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(createWorkSpace(name));
    handleFormClose();
    setName("");
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Box ml={{xs: 2, sm: 6, md: 12}} mt={2} mr={{xs: 2, sm: 6, md: 12}} mb={6}>
      <Typography variant="h5">
        Welcome, {user ? user.firstName : null}
      </Typography>
      <Typography variant="h6">Let's get to work</Typography>

      <Typography variant="h4" component="h2" mt={4}>
        WorkSpaces
      </Typography>

      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={3}
      >
        {workSpaces
          ? workSpaces?.map((workSpace) => {
              return (
                <WorkSpaceCard key={workSpace._id} workSpace={workSpace} />
              );
            })
          : "No Workspaces"}
      </Stack>

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<WorkspacesIcon />}
          tooltipTitle={"Workspace"}
          onClick={handleFormOpen}
        />
      </SpeedDial>
      <Dialog open={formOpen} onClose={handleFormClose}>
        <DialogTitle>Let's Create a Workspace</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out this form to create a workspace
          </DialogContentText>
          <WorkSpaceForm
            name={name}
            onFormChange={onFormChange}
            onFormSubmit={onFormSubmit}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Dashboard;
