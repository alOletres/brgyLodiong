import {
  Person2Rounded,
  FolderCopyOutlined,
  RequestPageRounded,
  Person2TwoTone,
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

const { OFFICIALS, PROJECTS, REQUEST, RESIDENTS } = EROUTE_PROTECTED;

export const useHooks = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const [list] = useState<IDrawerListProps[]>([
    { icon: <Person2Rounded />, link: OFFICIALS }, // Properly invoke the component using <>
    { icon: <FolderCopyOutlined />, link: PROJECTS },
    { icon: <Person2TwoTone />, link: RESIDENTS },
    { icon: <RequestPageRounded />, link: REQUEST },
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
