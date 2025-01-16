"use client";
import CustomTable from "@/components/Table";
import { useHooks } from "./hook";
import SearchBar from "@/components/SearchBar";
import Modal from "@/components/Modal";
import { RequestSchema } from "@/schema";
import LinearLoader from "@/components/LinearLoader";
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
    user,
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
      <SearchBar label="Search requested by" onChange={handleSearch} />
      <CustomTable
        tableHeader="List of requests"
        dataSource={dataSource}
        columns={columnSchema}
        cellActions={user?.role === "ADMIN" ? tableCellActions : undefined}
        headerActions={tableHeaderActions}
      />

      {isFetchingRequest && <LinearLoader height={4} />}
    </>
  );
};

export default RequestPage;
