import { Toolbar, IconButton, Typography, Box } from "@mui/material";
import { Menu as MenuIcon, LogoutTwoTone } from "@mui/icons-material";

import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
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
          }}
        >
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              ":hover": { cursor: "pointer", color: "gray" },
            }}
          >
            <LogoutTwoTone />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
