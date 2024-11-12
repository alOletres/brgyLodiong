"use client";
import CustomTable from "@/components/Table";
import { useHooks } from "./hook";
import { LinearProgress } from "@mui/material";
import SearchBar from "@/components/SearchBar";
import Modal from "@/components/Modal";
import { RequestSchema } from "@/schema";
const RequestPage = () => {
  const {
    dataSource,
    columnSchema,
    tableCellActions,
    tableHeaderActions,
    isFetchingRequest,
    handleSearch,
    openModal,
    btnName,
    handleSubmit,
    handleToggleModal,
    fields,
    initialValues,
  } = useHooks();

  return (
    <>
      <Modal
        title="Request"
        open={openModal}
        btnName={btnName}
        width={500}
        handleClose={handleToggleModal}
        formProps={{
          fields,
          initialValues,
          handleSubmit,
          validationSchema: RequestSchema,
        }}
      />
      {isFetchingRequest ? (
        <LinearProgress color="primary" />
      ) : (
        <>
          <SearchBar label="Search requested by" onChange={handleSearch} />
          <CustomTable
            tableHeader="List of requests"
            dataSource={dataSource}
            columns={columnSchema}
            cellActions={tableCellActions}
            headerActions={tableHeaderActions}
          />
        </>
      )}
    </>
  );
};

export default RequestPage;
