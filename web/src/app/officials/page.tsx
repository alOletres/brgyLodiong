"use client";
import CustomTable from "@/components/Table";
import { useHooks } from "./hook";
import Modal from "@/components/Modal";
import { OfficialSchema } from "@/schema";
import SearchBar from "@/components/SearchBar";
import { LinearProgress } from "@mui/material";

const OfficialPage = () => {
  const {
    columnSchema,
    dataSource,
    tableHeaderActions,
    openModal,
    modalFields,
    handleToggleModal,
    initialValues,
    handleSubmit,
    btnName,
    tableCellActions,
    handleSearch,
    isFetchingOfficials,
  } = useHooks();
  return (
    <>
      <Modal
        open={openModal}
        formProps={{
          fields: modalFields,
          handleSubmit,
          initialValues,
          validationSchema: OfficialSchema,
        }}
        handleClose={handleToggleModal}
        key="officialModal"
        title="Official"
        btnName={btnName}
        width={500}
      />
      <SearchBar label="Search firstname" onChange={handleSearch} />

      {isFetchingOfficials ? (
        <LinearProgress color="primary" />
      ) : (
        <CustomTable
          tableHeader="Officials list"
          columns={columnSchema}
          dataSource={dataSource}
          headerActions={tableHeaderActions}
          cellActions={tableCellActions}
        />
      )}
    </>
  );
};

export default OfficialPage;
