/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, SxProps, Theme } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const searchWrapper: SxProps<Theme> = {
  display: "flex",
  width: "100%",
};

/**
 * Search bar properties
 * extend {@link TableActions} props
 */
interface SearchBarProps {
  label: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

const SearchBar = ({ label, onChange }: SearchBarProps) => {
  return (
    <Box sx={searchWrapper}>
      <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          sx={{ width: "50%" }}
          id="input-with-sx"
          label={label}
          variant="standard"
          onChange={onChange}
          autoComplete="off"
        />
      </Box>
    </Box>
  );
};

export default SearchBar;
