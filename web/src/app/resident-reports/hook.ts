/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomDatePickerProps } from "@/components/DatePicker";
import { Field } from "@/components/hooks/useModal";
import { ColumnSchema } from "@/components/Table";
import { FindAllResidentsDto } from "@/store/api/gen/residents";
import { useResidentsApi } from "@/store/api/hooks/residents";
import { FormikHelpers } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { exportToPdf } from "@/lib/pdfMake";

// Extend Day.js
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const useHooks = () => {
  const { isFetchingStatus, residentsByStatus } = useResidentsApi();
  const [dataSource, setDataSource] = useState<FindAllResidentsDto[]>([]);

  const [btnName, setBtnName] = useState<string>("Search");
  const initialValues = {
    startDate: "",
    endDate: "",
    // status: "",
  };

  const columnSchema: ColumnSchema<FindAllResidentsDto>[] = [
    { key: "firstname", label: "Firstname" },
    { key: "lastname", label: "Lastname" },
    { key: "civilStatus", label: "Civil Status" },
    { key: "email", label: "Email" },
    { key: "contact", label: "Contact" },
    { key: "address", label: "Address" },
    { key: "status", label: "Status" },
    {
      key: "createdAt",
      label: "created at",
      format: (value) => moment(value).format("MM/DD/YYYY"),
    },
  ];

  const fields: Field<CustomDatePickerProps>[] = [
    {
      fieldType: "date",
      fieldProps: {
        label: "Select start date",
        name: "startDate",
      },
    },
    {
      fieldType: "date",
      fieldProps: {
        label: "Select end date",
        name: "endDate",
      },
    },
  ];

  const handleSubmit = (
    values: { startDate: string; endDate: string },
    { setSubmitting, resetForm }: FormikHelpers<any>
  ) => {
    if (btnName === "Search") {
      // Step 1 handle search for the start date and end date
      const filteredByDate = dataSource.filter((request) => {
        // Normalize dates to 'YYYY-MM-DD' to compare only year, month, and day
        const startDate = dayjs(values.startDate).startOf("day");
        const endDate = dayjs(values.endDate).startOf("day");
        const completedDate = dayjs(request.createdAt).startOf("day");

        const isDateInRange = request.createdAt
          ? endDate.isSameOrAfter(completedDate) &&
            startDate.isSameOrBefore(completedDate)
          : false;

        return isDateInRange;
      });

      setDataSource(filteredByDate);

      setSubmitting(false);
      setBtnName("Clear");
    } else {
      resetForm();
      setDataSource((residentsByStatus as FindAllResidentsDto[]) || []);
      setBtnName("Search");
    }
  };

  const handleExportToPdf = () => {
    if (dataSource?.length) {
      exportToPdf({
        pfdFor: "table",
        data: {
          columnSchema,
          dataSource: structuredClone(dataSource).map((resident) => {
            resident.createdAt = moment(resident.createdAt).format(
              "MM/DD/YYYY"
            );
            return resident;
          }),
          title: "Residents Report",
        },
      });
    }
  };
  useEffect(() => {
    if (residentsByStatus?.length) {
      setDataSource(residentsByStatus);
    }
  }, [residentsByStatus]);

  return {
    btnName,
    handleSubmit,
    fields,
    initialValues,
    isFetchingStatus,
    dataSource,
    columnSchema,
    handleExportToPdf,
  };
};
