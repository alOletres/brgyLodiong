/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ActionButtonProps, HeaderActions } from "../Table";
import { CustomDateRangePickerProps } from "@/components/DateRange";
import { CustomDatePickerProps } from "../DatePicker";

export const useHook = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const isButton = (
    component: HeaderActions<
      | ActionButtonProps<any>
      | CustomDateRangePickerProps
      | CustomDatePickerProps
    >
  ): component is HeaderActions<ActionButtonProps<any>> =>
    component.actionType === "button";

  const isDateRange = (
    component: HeaderActions<
      | ActionButtonProps<any>
      | CustomDateRangePickerProps
      | CustomDatePickerProps
    >
  ): component is HeaderActions<CustomDateRangePickerProps> =>
    component.actionType === "dateRange";

  const isDatePicker = (
    component: HeaderActions<
      | ActionButtonProps<any>
      | CustomDateRangePickerProps
      | CustomDatePickerProps
    >
  ): component is HeaderActions<CustomDatePickerProps> =>
    component.actionType === "date";

  return {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    isButton,
    isDateRange,
    isDatePicker,
  };
};
