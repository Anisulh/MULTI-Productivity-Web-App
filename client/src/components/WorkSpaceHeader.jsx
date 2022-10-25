import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getWorkSpace } from "../features/workSpace/workSpaceSlice";

function WorkSpaceHeader({ handleDrawerToggle, workSpaces }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onWorkSpaceClick = (workSpaceID) => {
    dispatch(getWorkSpace(workSpaceID));
    navigate('/dashboard/' + workSpaceID);
  }

  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Workspaces
      </Typography>
      {workSpaces.length > 0 && (
        <List>
          {workSpaces.map((workSpace) => (
            <ListItem 
            key={workSpace._id} disablePadding>
              <ListItemButton
               onClick={() => onWorkSpaceClick( workSpace._id)}
                sx={{ textAlign: "center" }}
              >
                <Badge
              
                  variant="dot"
                  sx={{
                    marginLeft: "10px",
                    "& .MuiBadge-badge": {
                      backgroundColor: workSpace.color,
                    },
                  }}
                ></Badge>
                <ListItemText primary={workSpace.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default WorkSpaceHeader;
