/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { requestColumnSchema, RequestTypeArray } from "../request/hook";
import dayjs from "dayjs";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { exportToPdf } from "@/lib/pdfMake";
import moment from "moment";

// Extend Day.js
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface RequestReportsDto extends Pick<FindAllRequestsDto, "requestType"> {
  startDate: string;
  endDate: string;
  requestMode: string;
}

const initialValues: RequestReportsDto = {
  startDate: "",
  endDate: "",
  requestType: "",
  requestMode: "",
  // status: "",
};

export const useHook = () => {
  const { isFetchingRequest, requests } = useRequestApi();

  const [dataSource, setDataSource] = useState<FindAllRequestsDto[]>([]);

  const [btnName, setBtnName] = useState<string>("Search");

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
        label: "Select Request type (Optional)",
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
        label: "Select Request Mode (Optional)",
        name: "requestMode",
        inputLabelId: "requestMode",
        labelId: "requestMode",
        options: ["ONLINE", "WALKIN"].map((value): OptionSelect => {
          return { key: value, value };
        }),
        margin: "dense",
      },
    },
  ];

  useEffect(() => {
    if (requests?.length) {
      const data = requests as FindAllRequestsDto[];

      const filteredData = data.filter(
        (request) => request.status === "CLAIMED"
      );

      setDataSource(filteredData);
    }
  }, [requests]);

  const filterNonEmptyValues = (
    obj: Record<string, any>
  ): Record<string, any> => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
    );
  };

  const handleSearch = (
    values: RequestReportsDto,
    { setSubmitting, resetForm }: FormikHelpers<RequestReportsDto>
  ) => {
    if (btnName === "Search") {
      // Step 1 handle search for the start date and end date
      const filteredByDate = dataSource.filter((request) => {
        // Normalize dates to 'YYYY-MM-DD' to compare only year, month, and day
        const startDate = dayjs(values.startDate).startOf("day");
        const endDate = dayjs(values.endDate).startOf("day");
        const completedDate = dayjs(request.dateCompleted).startOf("day");

        const isDateInRange = request.dateCompleted
          ? endDate.isSameOrAfter(completedDate) &&
            startDate.isSameOrBefore(completedDate)
          : false;

        const {
          startDate: _,
          endDate: __,
          ...searchObject
        } = values as RequestReportsDto;

        if (Object.keys(searchObject).length) {
          // Check search object condition

          // Filter the object to remove undefined, null, or empty values
          const filteredSearchObject = filterNonEmptyValues(searchObject);

          const isMatchingSearchObject = Object.entries(
            filteredSearchObject
          ).every(([key, value]) => {
            const keys = key as keyof Pick<
              FindAllRequestsDto,
              "requestMode" | "requestType"
            >;

            return request[keys] && value && request[keys] === value;
          });

          return isDateInRange && isMatchingSearchObject;
        } else {
          return isDateInRange;
        }
      });

      setDataSource(filteredByDate);
      setBtnName("Clear");
    } else {
      // Show all
      const data = requests as FindAllRequestsDto[];

      const filteredData = data.filter(
        (request) => request.status === "CLAIMED"
      );

      resetForm();
      setDataSource(filteredData);
      setBtnName("Search");
    }
    setSubmitting(false);
  };

  const handleExportToPdf = () => {
    exportToPdf({
      pfdFor: "table",
      data: {
        title: "Requests report",
        dataSource: structuredClone(dataSource).map((value) => {
          value.dateRequested = moment(
            new Date(value.dateRequested as string)
          ).format("MM/DD/YYYY");
          value.dateCompleted = moment(
            new Date(value.dateCompleted as string)
          ).format("MM/DD/YYYY");

          value.dateClaimed = moment(
            new Date(value.dateClaimed as string)
          ).format("MM/DD/YYYY");

          return value;
        }),
        columnSchema: requestColumnSchema.filter(
          (schema) => schema.key !== "rejectionReason" && schema.key !== "email"
        ),
      },
    });
  };

  return {
    initialValues,
    dataSource,
    isFetchingRequest,
    requests,
    fields,
    handleSubmit: handleSearch,
    btnName,
    handleExportToPdf,
  };
};
