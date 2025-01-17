"use client";
import CustomTable from "@/components/Table";
import { useHooks } from "./hook";
import SearchBar from "@/components/SearchBar";
import Modal from "@/components/Modal";
import {
  RejectionSchema,
  RequestResidentSchema,
  RequestSchema,
} from "@/schema";
import LinearLoader from "@/components/LinearLoader";
import DialogBox from "@/components/Dialog";
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
    isShowDialog,
    handleToggleDialog,
    handleConfirmDialog,
    rejectionOpenModal,
    handleSubmitRejectionReason,
    initialRejectionValues,
    rejectionField,
    handleToggleRejectionModal,
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
          validationSchema:
            user.role === "RESIDENT" ? RequestResidentSchema : RequestSchema,
        }}
      />

      <Modal
        title="Rejection reason (!)"
        open={rejectionOpenModal}
        btnName="Submit"
        width={500}
        handleClose={handleToggleRejectionModal}
        formProps={{
          fields: rejectionField,
          initialValues: initialRejectionValues,
          handleSubmit: handleSubmitRejectionReason,
          validationSchema: RejectionSchema,
        }}
      />
      <DialogBox
        open={isShowDialog}
        contentText="Are you sure? You want to reject the request?"
        toggleDialog={handleToggleDialog}
        title="Warning"
        handleSubmit={handleConfirmDialog}
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
