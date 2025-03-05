import {
  Person2Rounded,
  FolderCopyOutlined,
  Person2TwoTone,
  NotificationAddOutlined,
  EventAvailableOutlined,
  DashboardOutlined,
  ListAltOutlined,
  ListTwoTone,
} from "@mui/icons-material";
import { useEffect, useState } from "react";

import { EREPORT, EROUTE_PROTECTED } from "@/constants/route.enum";
import { usePathname } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { decodeToken } from "@/lib/tokenStorage";
import { FindAllResidentsDto, UserRole } from "@/store/api/gen/residents";

interface IDrawerListProps {
  link: string;
  icon: React.ReactNode; // Correct type for a React component in a prop
  label?: string;
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
    { icon: <ListAltOutlined />, link: REQUEST },
    { icon: <EventAvailableOutlined />, link: EVENTS },
    { icon: <NotificationAddOutlined />, link: NOTIFICATIONS },
  ]);

  const [reportList, setReportList] = useState<IDrawerListProps[]>([]);

  useEffect(() => {
    const decoded = decodeToken() as {
      resident: FindAllResidentsDto;
      role: UserRole;
    };

    if (decoded?.role === "RESIDENT") {
      setList([
        { icon: <Person2Rounded />, link: OFFICIALS },
        { icon: <FolderCopyOutlined />, link: PROJECTS },
        { icon: <ListAltOutlined />, link: REQUEST },
        { icon: <EventAvailableOutlined />, link: EVENTS },
        {
          icon: <NotificationAddOutlined />,
          link: NOTIFICATIONS,
          label: "Transaction History",
        },
      ]);
    }

    if (decoded?.role === "ADMIN") {
      setReportList([
        {
          icon: <ListTwoTone />,
          link: EREPORT.RESIDENT_REPORTS,
          label: "Resident report",
        },
        {
          icon: <ListTwoTone />,
          link: EREPORT.REQUEST_REPORTS,
          label: "Request report",
        },
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
    reportList,
  };
};
