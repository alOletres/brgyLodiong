/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  DateTimePicker,
  DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";
import { useField } from "formik";
import { Box } from "@mui/material";
import { ErrorWrapper } from "./TextFieldInput";
import dayjs from "dayjs";

export interface CustomDateTimePickerProps extends DateTimePickerProps<any> {}

const CustomDateTimePicker = ({ ...props }: CustomDateTimePickerProps) => {
  const [field, meta, helpers] = useField(props.name as string);

  const handleChange = (date: any) => {
    helpers.setValue(date ? dayjs(date) : null); // Set to null if the date is empty
  };

  return (
    <Box sx={{ marginY: 1 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          {...props}
          value={field.value ? dayjs(field.value) : null} // Ensure empty values are treated as null
          onChange={handleChange}
          sx={{ width: "100%" }}
        />
      </LocalizationProvider>
      {meta.touched && meta.error && <ErrorWrapper>*{meta.error}</ErrorWrapper>}
    </Box>
  );
};

export default CustomDateTimePicker;
