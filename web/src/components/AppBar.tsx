import {
  Toolbar,
  IconButton,
  Typography,
  Box,
  Badge,
  Menu,
  MenuItem,
  Button,
  ListItemText,
  Avatar,
  Link,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  LogoutTwoTone,
  Notifications,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { useAppBar } from "./hooks/useAppBar";
import React from "react";

const drawerWidth = 240;

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export interface ICustomAppBarProps {
  title: string;
  open: boolean;
  handleDrawerOpen: () => void;
}

export const CustomAppBar = ({
  title,
  open,
  handleDrawerOpen,
}: ICustomAppBarProps) => {
  const {
    handleSignOut,
    resident,
    open: menuOpen,
    handleClick,
    handleClose,
    anchorEl,
    dataSource,
    handleApprove,
    dataSourceRequest,
    handleApproveRequest,
  } = useAppBar();

  console.log("resident", resident);

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              marginRight: 5,
            },
            open && { display: "none" },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Notification Icon with Badge */}
            {resident.role === "ADMIN" ? (
              <IconButton
                id="demo-positioned-button"
                aria-controls={menuOpen ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? "true" : undefined}
                onClick={handleClick}
                color="inherit"
              >
                <Badge
                  badgeContent={dataSource.length + dataSourceRequest.length}
                  color="error"
                >
                  <Notifications />
                </Badge>
              </IconButton>
            ) : null}

            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <>
                <Typography sx={{ padding: 1 }}>
                  <Badge badgeContent={dataSource.length || 0} color="error">
                    Pending Residents
                  </Badge>
                </Typography>
                <Divider />
                {dataSource?.length ? (
                  dataSource
                    .sort((a, b) => (a.lastname > b.lastname ? 1 : -1))
                    .map((value, key) => (
                      <MenuItem key={key}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          width="100%"
                        >
                          {/* Avatar and user info */}
                          <Box display="flex" alignItems="center" gap={2}>
                            <Link
                              href={`${process.env.NEXT_PUBLIC_API_ORIGIN}/uploads/${value.image}`}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Avatar
                                src={`${process.env.NEXT_PUBLIC_API_ORIGIN}/uploads/${value.image}`}
                                alt={value.firstname}
                              />
                            </Link>
                            <ListItemText
                              primary={`${value.lastname}, ${value.firstname}`}
                              secondary={
                                <>
                                  <span>{value.role}</span>
                                  <br />
                                  <span>{value.email}</span>
                                  <br />
                                  <span>Status: {value.status}</span>
                                </>
                              }
                            />
                          </Box>
                          {/* Button aligned consistently */}
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleApprove(value)}
                          >
                            Approve
                          </Button>
                        </Box>
                      </MenuItem>
                    ))
                ) : (
                  <MenuItem>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <ListItemText primary="No pending available" />
                      <Button variant="contained" size="small" disabled>
                        Approve
                      </Button>
                    </Box>
                  </MenuItem>
                )}
                <Divider />

                {/* Resident request here */}
                <Typography sx={{ padding: 1 }}>
                  <Badge
                    badgeContent={dataSourceRequest.length || 0}
                    color="error"
                  >
                    Pending Requests
                  </Badge>
                </Typography>
                <Divider />

                {dataSourceRequest?.length ? (
                  dataSourceRequest.map((value, key) => (
                    <MenuItem key={key}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        width="100%"
                      >
                        {/* Avatar and user info */}
                        <Box display="flex" alignItems="center" gap={2}>
                          <ListItemText
                            primary={value.requestedBy}
                            secondary={
                              <>
                                <span>{value.requestType}</span>
                                <br />
                                <span>{value.address}</span>
                                <br />
                                <span>{value.contact}</span>
                                <br />
                                <span>Status: {value.status}</span>
                              </>
                            }
                          />
                        </Box>
                        {/* Button aligned consistently */}
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleApproveRequest(value)}
                        >
                          Approve
                        </Button>
                      </Box>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <ListItemText primary="No pending available" />
                      <Button variant="contained" size="small" disabled>
                        Approve
                      </Button>
                    </Box>
                  </MenuItem>
                )}
              </>
            </Menu>

            <Box sx={{ marginRight: 4, marginLeft: 2 }}>
              <Typography variant="overline" noWrap component="div">
                {resident.firstname} {resident.lastname}
              </Typography>
            </Box>
            <Box
              sx={{
                ":hover": {
                  cursor: "pointer",
                  color: "gray",
                },
              }}
              onClick={handleSignOut}
            >
              Sign Out <LogoutTwoTone />
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
