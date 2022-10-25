import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { getWorkSpaces } from "../features/workSpace/workSpaceSlice";
import { reset as authReset } from "../features/auth/authSlice";
import DrawerHeader from "./DrawerHeader";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import Button from "@mui/material/Button";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AppBar, DrawerHead } from "../styles.js/HeaderStyles";
import WorkSpaceHeader from "./WorkSpaceHeader";

function Header() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { workSpaces, workSpace, isError, message } = useSelector(
    (state) => state.workSpace
  );
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const settings = ["Profile", "Logout"];

  const onLogout = () => {
    dispatch(logout());
    dispatch(authReset());
    navigate("/");
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getWorkSpaces());
  }, [isError, message, dispatch, navigate, user]);

  const handleOpenUserMenu = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenuAnchor(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: "white",
          borderBottom: "solid rgba(211,211,211,0.4) 1px",
        }}
        elevation={0}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  mr: 2,
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  color: "black",
                  display: "inline",
                  textDecoration: "none",
                  cursor: 'pointer',
                 
                }}
                onClick={()=> navigate('/')}
              >
                MULTI
              </Typography>
              {location.pathname.indexOf("dashboard") === -1 ? null : (
                <>
                  <Button
                    startIcon={<ViewStreamIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    <Typography
                      component="a"
                      sx={{
                        color: "black",
                        display: "inline",
                        paddingRight: "10px",
                        textDecoration: "none",
                      }}
                      href={
                        workSpace === [] || workSpace._id === undefined
                          ? "/listview"
                          : "/listview/" + workSpace._id
                      }
                    >
                      List
                    </Typography>
                  </Button>
                  <Button
                    startIcon={<DashboardCustomizeIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    <Typography
                      component="a"
                      sx={{
                        color: "black",
                        display: "inline",
                        paddingRight: "10px",
                        textDecoration: "none",
                      }}
                      href={
                        workSpace === [] || workSpace._id === undefined
                          ? "/dashboard"
                          : "/boardview/" + workSpace._id
                      }
                    >
                      Board
                    </Typography>
                  </Button>

                  <Button
                    startIcon={<CalendarMonthRoundedIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    <Typography
                      component="a"
                      sx={{
                        color: "black",
                        display: "inline",
                        paddingRight: "10px",
                        textDecoration: "none",
                      }}
                      href={
                        workSpace === [] || workSpace._id === undefined
                          ? "/calendar"
                          : "/listview/" + workSpace._id
                      }
                    >
                      Calendar
                    </Typography>
                  </Button>
                </>
              )}
              {location.pathname.indexOf("boardview") === -1 ? null : (
                <>
                  <Button
                    startIcon={<ViewStreamIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    <Typography
                      component="a"
                      sx={{
                        color: "black",
                        display: "inline",
                        paddingRight: "10px",
                        textDecoration: "none",
                      }}
                      href={
                        workSpace === [] || workSpace._id === undefined
                          ? "/listview"
                          : "/listview/" + workSpace._id
                      }
                    >
                      List
                    </Typography>
                  </Button>
                  <Button
                    startIcon={<DashboardCustomizeIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    <Typography
                      component="a"
                      sx={{
                        color: "black",
                        display: "inline",
                        paddingRight: "10px",
                        textDecoration: "none",
                      }}
                      href={
                        workSpace === [] || workSpace._id === undefined
                          ? "/dashboard"
                          : "/boardview/" + workSpace._id
                      }
                    >
                      Board
                    </Typography>
                  </Button>

                  <Button
                    startIcon={<CalendarMonthRoundedIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    <Typography
                      component="a"
                      sx={{
                        color: "black",
                        display: "inline",
                        paddingRight: "10px",
                        textDecoration: "none",
                      }}
                      href={
                        workSpace === [] || workSpace._id === undefined
                          ? "/calendar"
                          : "/calendarview/" + workSpace._id
                      }
                    >
                      Calendar
                    </Typography>
                  </Button>
                </>
              )}
              {location.pathname.indexOf("listview") === -1 ? null : (
                <>
                  <Button
                    startIcon={<ViewStreamIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    <Typography
                      component="a"
                      sx={{
                        color: "black",
                        display: "inline",
                        paddingRight: "10px",
                        textDecoration: "none",
                      }}
                      href={
                        workSpace === [] || workSpace._id === undefined
                          ? "/listview"
                          : "/listview/" + workSpace._id
                      }
                    >
                      List
                    </Typography>
                  </Button>
                  <Button
                    startIcon={<DashboardCustomizeIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    <Typography
                      component="a"
                      sx={{
                        color: "black",
                        display: "inline",
                        paddingRight: "10px",
                        textDecoration: "none",
                      }}
                      href={
                        workSpace === [] || workSpace._id === undefined
                          ? "/dashboard"
                          : "/boardview/" + workSpace._id
                      }
                    >
                      Board
                    </Typography>
                  </Button>

                  <Button
                    startIcon={<CalendarMonthRoundedIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    <Typography
                      component="a"
                      sx={{
                        color: "black",
                        display: "inline",
                        paddingRight: "10px",
                        textDecoration: "none",
                      }}
                      href={
                        workSpace === [] || workSpace._id === undefined
                          ? "/calendar"
                          : "/calendarview/" + workSpace._id
                      }
                    >
                      Calendar
                    </Typography>
                  </Button>
                </>
              )}
              {location.pathname.indexOf("calendarview") === -1 ? null : (
                <>
                  <Button
                    startIcon={<ViewStreamIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    <Typography
                      component="a"
                      sx={{
                        color: "black",
                        display: "inline",
                        paddingRight: "10px",
                        textDecoration: "none",
                      }}
                      href={
                        workSpace === [] || workSpace._id === undefined
                          ? "/listview"
                          : "/listview/" + workSpace._id
                      }
                    >
                      List
                    </Typography>
                  </Button>
                  <Button
                    startIcon={<DashboardCustomizeIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    <Typography
                      component="a"
                      sx={{
                        color: "black",
                        display: "inline",
                        paddingRight: "10px",
                        textDecoration: "none",
                      }}
                      href={
                        workSpace === [] || workSpace._id === undefined
                          ? "/dashboard"
                          : "/boardview/" + workSpace._id
                      }
                    >
                      Board
                    </Typography>
                  </Button>

                  <Button
                    startIcon={<CalendarMonthRoundedIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    <Typography
                      component="a"
                      sx={{
                        color: "black",
                        display: "inline",
                        paddingRight: "10px",
                        textDecoration: "none",
                      }}
                      href={
                        workSpace === [] || workSpace._id === undefined
                          ? "/calendar"
                          : "/calendarview/" + workSpace._id
                      }
                    >
                      Calendar
                    </Typography>
                  </Button>
                </>
              )}
              <Drawer
                open={drawerOpen}
                anchor="left"
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true,
                }}
                variant="temporary"
                sx={{
                  width: 240,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: 240,
                    boxSizing: "border-box",
                  },
                }}
              >
                <DrawerHead>
                  <Typography
                    variant="h5"
                    component="h1"
                    onClick={() => {
                      navigate('/')
                    }}
                    sx={{ mr: 7, cursor: 'pointer' }}

                  >
                    MULTI
                  </Typography>
                  <IconButton onClick={handleDrawerToggle}>
                    {theme.direction === "ltr" ? (
                      <ChevronLeftIcon />
                    ) : (
                      <ChevronRightIcon />
                    )}
                  </IconButton>
                </DrawerHead>
                <DrawerHeader
                  workSpaces={workSpaces}
                  handleDrawerToggle={handleDrawerToggle}
                />
                <Divider />
                <WorkSpaceHeader
                  handleDrawerToggle={handleDrawerToggle}
                  workSpaces={workSpaces}
                />
              </Drawer>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user.firstName}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={userMenuAnchor}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(userMenuAnchor)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    {setting === "Logout" ? (
                      <Typography textAlign="center" onClick={onLogout}>
                        {setting}
                      </Typography>
                    ) : (
                      <Typography textAlign="center">{setting}</Typography>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Header;
