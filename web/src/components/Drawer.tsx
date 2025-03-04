"use client";
import * as React from "react";
import { styled, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CustomAppBar } from "@/components/AppBar";
import Image from "next/image";

import BrgyLogo from "@/assets/logo.png";
import { Tooltip, Typography } from "@mui/material";
import { useHooks } from "@/components/hooks/useDrawer";
import Link from "next/link";

import { Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ViewAgendaOutlined from "@mui/icons-material/ViewAgendaOutlined";

const drawerWidth = 240;

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export const MiniDrawer = ({ children }: React.PropsWithChildren) => {
  const {
    list,
    pathname,
    open,
    handleDrawerClose,
    handleDrawerOpen,
    theme,
    reportList,
  } = useHooks();

  const [reportsOpen, setReportsOpen] = React.useState(false);

  const handleReportsClick = () => {
    setReportsOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomAppBar
        title="Document Request and Project Accomplishment"
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ justifyContent: "space-between" }}>
          <Image
            src={BrgyLogo}
            width={50}
            height={50}
            alt="Picture of the author"
          />
          <Typography sx={{ fontWeight: "bold", fontSize: 12 }}>
            Brgy. Lower Lodiong
          </Typography>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {list.map((label, key) => (
            <Tooltip
              sx={{ textTransform: "capitalize" }}
              key={key}
              title={!open ? label.link : ""}
              placement="right"
              arrow
            >
              <ListItem
                key={label.link}
                disablePadding
                sx={{ display: "block" }}
              >
                <Link href={label.link}>
                  <ListItemButton
                    sx={[
                      pathname === label.link
                        ? {
                            background: "#e7e6e3",
                          }
                        : {},
                      {
                        minHeight: 48,
                        px: 2.5,
                      },
                      open
                        ? {
                            justifyContent: "initial",
                          }
                        : {
                            justifyContent: "center",
                          },
                    ]}
                  >
                    <ListItemIcon
                      sx={[
                        {
                          minWidth: 0,
                          justifyContent: "center",
                        },
                        open
                          ? {
                              mr: 3,
                            }
                          : {
                              mr: "auto",
                            },
                      ]}
                    >
                      {label.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        label.link === "notifications"
                          ? "Transaction History"
                          : label.link
                      }
                      sx={[
                        { textTransform: "capitalize" },
                        open
                          ? {
                              opacity: 1,
                            }
                          : {
                              opacity: 0,
                            },
                      ]}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            </Tooltip>
          ))}

          {reportList?.length ? (
            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip
                sx={{ textTransform: "capitalize" }}
                title={!open ? "Reports" : ""}
                placement="right"
                arrow
              >
                <ListItemButton onClick={handleReportsClick}>
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: "center",
                      },
                      open
                        ? {
                            mr: 3,
                            pl: 1,
                          }
                        : {
                            mr: "auto",
                          },
                    ]}
                  >
                    <ViewAgendaOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary="Reports"
                    sx={[
                      { textTransform: "capitalize" },
                      open
                        ? {
                            opacity: 1,
                          }
                        : {
                            opacity: 0,
                          },
                    ]}
                  />
                  {reportsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </Tooltip>
              <Collapse in={reportsOpen} timeout="auto" unmountOnExit>
                <List>
                  {reportList.map(({ link, label, icon }, key) => (
                    <Tooltip
                      sx={{ textTransform: "capitalize" }}
                      key={key}
                      title={!open ? label : ""}
                      placement="right"
                      arrow
                    >
                      <ListItem
                        key={link}
                        disablePadding
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Link href={link}>
                          <ListItemButton
                            sx={[
                              pathname === link
                                ? {
                                    background: "#e7e6e3",
                                  }
                                : {},
                              {
                                minHeight: 48,
                                px: 5,
                                pl: open ? 5 : 2, // Adjust padding based on sidebar state
                              },
                              open
                                ? {
                                    justifyContent: "initial",
                                  }
                                : {
                                    justifyContent: "center",
                                  },
                            ]}
                          >
                            <ListItemIcon
                              sx={[
                                {
                                  minWidth: 0,
                                  justifyContent: "center",
                                },
                                open
                                  ? {
                                      mr: 3,
                                    }
                                  : {
                                      mr: "auto",
                                    },
                              ]}
                            >
                              {icon}
                            </ListItemIcon>
                            {open && (
                              <ListItemText
                                primary={label}
                                sx={{
                                  textTransform: "capitalize",
                                  opacity: 1,
                                }}
                              />
                            )}
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    </Tooltip>
                  ))}
                </List>
              </Collapse>
            </ListItem>
          ) : null}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, maxWidth: "100%", overflowX: "hidden" }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
