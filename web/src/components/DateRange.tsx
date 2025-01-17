/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateRangePicker,
  DateRangePickerProps,
} from "@mui/x-date-pickers-pro/DateRangePicker";
import { FormikHelpers } from "formik";

export interface CustomDateRangePickerProps extends DateRangePickerProps<any> {
  localeText?: any;
  onSubmit?: (value: any, helpers: FormikHelpers<any>) => void;
}
const CustomDateRangePicker = ({
  name,
  localeText,
}: CustomDateRangePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker label={name} name={name} localeText={localeText} />
    </LocalizationProvider>
  );
};
export default CustomDateRangePicker;
