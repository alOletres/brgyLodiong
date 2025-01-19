"use client";
import LinearLoader from "@/components/LinearLoader";
import { useHooks } from "./hook";
import CustomTable from "@/components/Table";
import { residentReportSchema } from "@/schema";

const ResidentReportPage = () => {
  const {
    btnName,
    handleSubmit,
    fields,
    initialValues,
    dataSource,
    isFetchingStatus,
    columnSchema,
    handleExportToPdf,
  } = useHooks();

  return (
    <>
      {isFetchingStatus && <LinearLoader height={4} />}

      <CustomTable
        dataSource={dataSource}
        columns={columnSchema}
        formProps={{
          initialValues,
          fields,
          handleSubmit,
          validationSchema: residentReportSchema,
        }}
        btnName={btnName}
        handleExportToPdf={handleExportToPdf}
      />
    </>
  );
};

export default ResidentReportPage;
