/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomDatePickerProps } from "@/components/DatePicker";
import { CustomDateRangePickerProps } from "@/components/DateRange";
import { Field } from "@/components/hooks/useModal";
import { OptionSelect, SelectFieldProps } from "@/components/Select";
import { ActionButtonProps, HeaderActions } from "@/components/Table";
import { CustomInputProps } from "@/components/TextFieldInput";
import { FindAllRequestsDto } from "@/store/api/gen/request";
import { useRequestApi } from "@/store/api/hooks/request";
import { FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { RequestStatusArray, RequestTypeArray } from "../request/hook";

const initialValues = {
  startDate: "",
  endDate: "",
  requestType: "",
  requestModeL: "",
  status: "",
};

export const useHook = () => {
  const { isFetchingRequest, requests } = useRequestApi();

  const [dataSource, setDataSource] = useState<FindAllRequestsDto[]>([]);

  const handleFilterDate = (
    payload: any,
    { setSubmitting }: FormikHelpers<any>
  ) => {
    console.log("payload", payload, setSubmitting);
  };

  const tableHeaderActions: HeaderActions<
    ActionButtonProps<any> | CustomDateRangePickerProps
  >[] = [
    {
      actionType: "dateRange",
      actionProps: <CustomDateRangePickerProps>{
        localeText: { start: "Start date", end: "End date" },
        onSubmit: handleFilterDate,
        name: "dateRange",
      },
    },
  ];

  const fields: Field<
    SelectFieldProps | CustomInputProps | CustomDatePickerProps
  >[] = [
    {
      fieldType: "date",
      fieldProps: <CustomDatePickerProps>{
        label: "Select start date",
        name: "startDate",
      },
    },
    {
      fieldType: "date",
      fieldProps: <CustomDatePickerProps>{
        label: "Select end date",
        name: "endDate",
      },
    },
    {
      fieldType: "select",
      fieldProps: {
        id: "requestType",
        label: "Select Request type",
        name: "requestType",
        inputLabelId: "requestType",
        labelId: "requestType",
        options: RequestTypeArray.map((value): OptionSelect => {
          return { key: value, value };
        }),
        margin: "dense",
      },
    },

    {
      fieldType: "select",
      fieldProps: {
        id: "requestMode",
        label: "Select Request Mode",
        name: "requestMode",
        inputLabelId: "requestMode",
        labelId: "requestMode",
        options: ["ONLINE", "WALKIN"].map((value): OptionSelect => {
          return { key: value, value };
        }),
        margin: "dense",
      },
    },

    {
      fieldType: "select",
      fieldProps: {
        id: "status",
        label: "Select status",
        name: "status",
        inputLabelId: "status",
        labelId: "status",
        options: RequestStatusArray.map((value): OptionSelect => {
          return { key: value, value };
        }),
        margin: "dense",
      },
    },
  ];

  const handleSubmit = (values: any, {}: FormikHelpers<any>) => {
    console.log("values", values);
  };

  useEffect(() => {
    if (requests?.length) {
      setDataSource(requests);
    }
  }, [requests]);

  return {
    initialValues,
    dataSource,
    isFetchingRequest,
    requests,
    tableHeaderActions,
    fields,
    handleSubmit,
  };
};
