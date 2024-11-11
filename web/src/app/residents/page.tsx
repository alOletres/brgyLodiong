"use client";
import CustomTable from "@/components/Table";
import { useHooks } from "./hook";
import { LinearProgress } from "@mui/material";
import Modal from "@/components/Modal";
import { ResidentSchema } from "@/schema";
import SearchBar from "@/components/SearchBar";

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
  } = useHooks();

  return (
    <>
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
      {isFetchingResidents ? (
        <LinearProgress color="primary" />
      ) : (
        <>
          <SearchBar label="Search firstname" onChange={handleSearch} />
          <CustomTable
            tableHeader="List of Residents"
            dataSource={dataSource}
            columns={columnSchema}
            headerActions={tableHeaderActions}
            cellActions={tableCellActions}
          />
        </>
      )}
    </>
  );
};

export default ResidentPage;
