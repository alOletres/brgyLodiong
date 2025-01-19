"use client";
import CustomTable from "@/components/Table";
import { useHooks } from "./hook";
import Modal from "@/components/Modal";
import { DisApproveSchema, ResidentSchema } from "@/schema";
import SearchBar from "@/components/SearchBar";
import LinearLoader from "@/components/LinearLoader";
import DialogBox from "@/components/Dialog";

const ResidentPage = () => {
  const {
    dataSource,
    columnSchema,
    isFetchingResidents,
    tableHeaderActions,
    tableCellActions,
    initialValues,
    handleSubmit,
    fields,
    handleToggleModal,
    open,
    btnName,
    handleSearch,
    isShowDialog,
    handleToggleDialog,
    handleConfirmDialog,
    rejectionOpenModal,
    initialRejectionValues,
    handleToggleRejectionModal,
    rejectionField,
    handleSubmitDisApproveReason,
  } = useHooks();

  return (
    <>
      {isFetchingResidents && <LinearLoader height={4} />}
      <Modal
        title="Resident"
        formProps={{
          initialValues,
          validationSchema: ResidentSchema,
          fields,
          handleSubmit,
        }}
        handleClose={handleToggleModal}
        open={open}
        width={500}
        btnName={btnName}
      />

      <DialogBox
        open={isShowDialog}
        contentText="Are you sure? You want to disapprove the registration?"
        toggleDialog={handleToggleDialog}
        title="Warning"
        handleSubmit={handleConfirmDialog}
      />

      <Modal
        title="Disapprove reason (!)"
        open={rejectionOpenModal}
        btnName="Submit"
        width={500}
        handleClose={handleToggleRejectionModal}
        formProps={{
          fields: rejectionField,
          initialValues: initialRejectionValues,
          handleSubmit: handleSubmitDisApproveReason,
          validationSchema: DisApproveSchema,
        }}
      />
      <SearchBar label="Search firstname" onChange={handleSearch} />
      <CustomTable
        tableHeader="List of Residents"
        dataSource={dataSource}
        columns={columnSchema}
        headerActions={tableHeaderActions}
        cellActions={tableCellActions}
      />
    </>
  );
};

export default ResidentPage;
