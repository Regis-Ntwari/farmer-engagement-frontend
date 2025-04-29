// src/components/DashboardLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ShoppingBasket as ProductsIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Logout as LogoutIcon,
  PhoneInTalk,
  Person,
  Verified,
} from "@mui/icons-material";
import { COLORS } from "../utils/Colors";

const getNavItems = (role) => {
  const commonItems = [
    { text: "Summary", icon: <DashboardIcon />, path: "/dashboard" },
    {
      text: "Conversations",
      icon: <PhoneInTalk />,
      path: "/dashboard/conversation",
    },
    {
      text: "Best Practices",
      icon: <Verified />,
      path: "/dashboard/best-practices",
    },
    { text: "Profile", icon: <Person />, path: "/dashboard/profile" },
  ];

  if (role === "GOVERNMENT") {
    return [
      ...commonItems,
      { text: "Users", icon: <PeopleIcon />, path: "/dashboard/users" },
    ];
  }

  return commonItems;
};

const drawerWidth = 240;
const collapsedDrawerWidth = 64;

const DashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const user = JSON.parse(localStorage.getItem("user"));
    if (role) {
      setUserRole(JSON.parse(role));
    }
    if (user) {
      setUserInfo(user);
    }
  }, []);

  const open = isMobile ? mobileOpen : desktopOpen;
  const width = open ? drawerWidth : collapsedDrawerWidth;
  const navItems = getNavItems(userRole);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setDesktopOpen(!desktopOpen);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar
        position="fixed"
        style={{ backgroundColor: COLORS.primaryColor }}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
          ml: open ? `${drawerWidth}px` : 0,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            MY DASHBOARD
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: open ? drawerWidth : collapsedDrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : collapsedDrawerWidth,
            boxSizing: "border-box",
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              overflow: "hidden",
            }}
          >
            {open && (
              <Typography variant="h6" noWrap>
                Pig Farm Connect
              </Typography>
            )}
            {open && !isMobile && (
              <IconButton onClick={handleDrawerToggle}>
                <ChevronLeftIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>

        <Divider />

        {/* User Profile Section */}
        {open && userInfo && (
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: COLORS.primaryColor,
                fontSize: "1.5rem",
              }}
            >
              {userInfo.firstname[0]}
              {userInfo.lastname[0]}
            </Avatar>
            <Typography variant="subtitle1" fontWeight="bold">
              {userInfo.firstname} {userInfo.lastname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userRole}
            </Typography>
          </Box>
        )}

        <Divider />

        {/* Navigation Items */}
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&.Mui-selected": {
                    color: COLORS.whiteColor,
                    backgroundColor: COLORS.primaryColor,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color:
                      location.pathname === item.path
                        ? COLORS.whiteColor
                        : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: "auto" }}>
          <Divider />
          <ListItemButton
            onClick={handleLogout}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              color: "error.main",
              "&:hover": {
                backgroundColor: "error.light",
                color: "error.contrastText",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "inherit",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </ListItemButton>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: open
            ? `calc(100% - ${drawerWidth}px)`
            : `calc(100% - ${collapsedDrawerWidth}px)`,
          ml: "auto",
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginTop: "64px", // App bar height
        }}
      >
        <Box
          sx={{ p: 3, width: "100%", maxWidth: "100%", overflowX: "hidden" }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
