import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import MoreMenu from "./MoreMenu";
import { useNavigate } from "react-router-dom";
import { CardActionArea } from "@mui/material";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { updateWorkSpace } from "../features/workSpace/workSpaceSlice";
import WorkSpaceForm from "./WorkSpaceForm";

function WorkSpaceCard({ workSpace }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [updateFormData, setUpdateFormData] = useState({
    name: workSpace.name
  })
  const {name} = updateFormData
  const onFormChange = (e) => {
    setUpdateFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  const handleFormOpen = () => {
    setShowUpdateForm(true)
  }
  const onFormSubmit = (e) => {
    e.preventDefault();
    const workSpaceInfo = {...workSpace}
    workSpaceInfo.name = name
    console.log(workSpaceInfo)
    const workSpaceID = workSpace._id
    dispatch(updateWorkSpace({workSpaceID, workSpaceInfo}))
    setShowUpdateForm(false);
  }

  return (
    <>
      <Card
        sx={{
          maxWidth: 300,
          borderRadius: "10px",
          cursor: "pointer",
          display: "flex",
          borderTop: `5px solid ${workSpace.color}`,
        }}
      >
        <CardActionArea onClick={() => navigate(`/boardview/${workSpace._id}`)}>
          <CardHeader
            title={workSpace.name}
            subheader={new Date(workSpace.createdAt).toLocaleString("en-US")}
            
          />
        </CardActionArea>
        <MoreMenu item={workSpace} itemFormOpen={handleFormOpen} />
      </Card>
      <Dialog open={showUpdateForm} >
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
    </>
  );
}

export default WorkSpaceCard;
