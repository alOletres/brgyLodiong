"use client";

import LinearLoader from "@/components/LinearLoader";

import CustomTable from "@/components/Table";
import { useHook } from "./hook";
import { requestColumnSchema } from "../request/hook";
import { requestReportSchema } from "@/schema";

const RequestReportPage = () => {
  const { handleSubmit, isFetchingRequest, dataSource, initialValues, fields } =
    useHook();

  return (
    <>
      {isFetchingRequest && <LinearLoader height={4} />}

      <CustomTable
        dataSource={dataSource}
        columns={requestColumnSchema}
        formProps={{
          initialValues,
          fields,
          handleSubmit,
          validationSchema: requestReportSchema,
        }}
      />
    </>
  );
};

export default RequestReportPage;
