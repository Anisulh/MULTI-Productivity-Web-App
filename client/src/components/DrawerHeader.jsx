import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import ListItemIcon from "@mui/material/ListItemIcon";

function DrawerHeader({ handleDrawerToggle }) {
  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "left" }} to={"/"}>
          <ListItemIcon>
            <HomeRoundedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "left" }} to={"/dashboard"}>
            <ListItemIcon>
              <DashboardCustomizeOutlinedIcon fontSize="small" />
            </ListItemIcon>

            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "left" }} to={"/mytasks"}>
          <ListItemIcon>
            <LibraryAddCheckOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={"My Tasks"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "left" }} to={"/calendar"}>
          <ListItemIcon>
            <EmojiEventsOutlinedIcon fontSize="small" />
          </ListItemIcon>
            <ListItemText primary={"Calendar"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default DrawerHeader;
