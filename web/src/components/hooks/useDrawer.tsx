import {
  Person2Rounded,
  FolderCopyOutlined,
  RequestPageRounded,
  Person2TwoTone,
  NotificationAddOutlined,
  EventAvailableOutlined,
  DashboardOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";

import { EROUTE_PROTECTED } from "@/constants/route.enum";
import { usePathname } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { decodeToken } from "@/lib/tokenStorage";
import { FindAllResidentsDto, UserRole } from "@/store/api/gen/residents";

interface IDrawerListProps {
  link: string;
  icon: React.ReactNode; // Correct type for a React component in a prop
}

export interface DecodedTokenValues {
  resident: FindAllResidentsDto;
  role: UserRole;
  id: number;
}

const {
  DASHBOARD,
  OFFICIALS,
  PROJECTS,
  REQUEST,
  RESIDENTS,
  NOTIFICATIONS,
  EVENTS,
} = EROUTE_PROTECTED;

export const useHooks = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [list, setList] = useState<IDrawerListProps[]>([
    { icon: <DashboardOutlined />, link: DASHBOARD },
    { icon: <Person2Rounded />, link: OFFICIALS }, // Properly invoke the component using <>
    { icon: <FolderCopyOutlined />, link: PROJECTS },
    { icon: <Person2TwoTone />, link: RESIDENTS },
    { icon: <RequestPageRounded />, link: REQUEST },
    { icon: <EventAvailableOutlined />, link: EVENTS },
    { icon: <NotificationAddOutlined />, link: NOTIFICATIONS },
  ]);

  useEffect(() => {
    const decoded = decodeToken() as {
      resident: FindAllResidentsDto;
      role: UserRole;
    };

    if (decoded?.role === "RESIDENT") {
      setList([
        { icon: <DashboardOutlined />, link: DASHBOARD },
        { icon: <RequestPageRounded />, link: REQUEST },
        { icon: <EventAvailableOutlined />, link: EVENTS },
        { icon: <NotificationAddOutlined />, link: NOTIFICATIONS },
      ]);
    }
  }, []);

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
  return {
    list,
    pathname,
    handleDrawerClose,
    handleDrawerOpen,
    theme,
    open,
  };
};
