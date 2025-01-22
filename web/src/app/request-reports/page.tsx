"use client";

import LinearLoader from "@/components/LinearLoader";

import CustomTable from "@/components/Table";
import { useHook } from "./hook";
import { requestColumnSchema } from "../request/hook";
import { requestReportSchema } from "@/schema";

const RequestReportPage = () => {
  const {
    btnName,
    handleSubmit,
    isFetchingRequest,
    dataSource,
    initialValues,
    fields,
    handleExportToPdf,
  } = useHook();

  return (
    <>
      {isFetchingRequest && <LinearLoader height={4} />}

      <CustomTable
        dataSource={dataSource}
        columns={requestColumnSchema.filter(
          (schema) =>
            schema.key !== "dateRequested" &&
            schema.key !== "rejectionReason" &&
            schema.key !== "dateCompleted"
        )}
        formProps={{
          initialValues,
          fields,
          handleSubmit,
          validationSchema: requestReportSchema,
        }}
        btnName={btnName}
        handleExportToPdf={handleExportToPdf}
      />
    </>
  );
};

export default RequestReportPage;
