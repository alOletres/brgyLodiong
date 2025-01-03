import {
  Person2Rounded,
  FolderCopyOutlined,
  RequestPageRounded,
  Person2TwoTone,
  NotificationAddOutlined,
  EventAvailableOutlined,
<<<<<<< HEAD
  DashboardOutlined,
=======
>>>>>>> 17d2ce1253201a5fddb80f33b74e0e656cee6b3b
} from "@mui/icons-material";
import { useState } from "react";

import { EROUTE_PROTECTED } from "@/constants/route.enum";
import { usePathname } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import React from "react";

interface IDrawerListProps {
  link: string;
  icon: React.ReactNode; // Correct type for a React component in a prop
}

<<<<<<< HEAD
const {
  DASHBOARD,
  OFFICIALS,
  PROJECTS,
  REQUEST,
  RESIDENTS,
  NOTIFICATIONS,
  EVENTS,
} = EROUTE_PROTECTED;
=======
const { OFFICIALS, PROJECTS, REQUEST, RESIDENTS, NOTIFICATIONS, EVENTS } =
  EROUTE_PROTECTED;
>>>>>>> 17d2ce1253201a5fddb80f33b74e0e656cee6b3b

export const useHooks = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const [list] = useState<IDrawerListProps[]>([
<<<<<<< HEAD
    { icon: <DashboardOutlined />, link: DASHBOARD },
=======
>>>>>>> 17d2ce1253201a5fddb80f33b74e0e656cee6b3b
    { icon: <Person2Rounded />, link: OFFICIALS }, // Properly invoke the component using <>
    { icon: <FolderCopyOutlined />, link: PROJECTS },
    { icon: <Person2TwoTone />, link: RESIDENTS },
    { icon: <RequestPageRounded />, link: REQUEST },
    { icon: <EventAvailableOutlined />, link: EVENTS },
    { icon: <NotificationAddOutlined />, link: NOTIFICATIONS },
  ]);

  // Url Name
  const urlname = usePathname();
  // Path Name
  const pathname = urlname.replace("/", "").trim();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return { list, pathname, handleDrawerClose, handleDrawerOpen, theme, open };
};
