"use client";
import CustomTable from "@/components/Table";
import { useHooks } from "./hook";
import { LinearProgress } from "@mui/material";
import Modal from "@/components/Modal";
import { ProjectsSchema } from "@/schema";
import SearchBar from "@/components/SearchBar";

const ProjectsPage = () => {
  const {
    dataSource,
    columnSchema,
    headerActions,
    isFetchingProjects,
    fields,
    handleToggleModal,
    initialValues,
    openModal,
    handleSubmit,
    btnName,
    tableCellActions,
    handleSearch,
  } = useHooks();

  return (
    <>
      <Modal
        title="Projects"
        open={openModal}
        handleClose={handleToggleModal}
        formProps={{
          fields,
          initialValues,
          handleSubmit,
          validationSchema: ProjectsSchema,
        }}
        btnName={btnName}
        width={500}
      />
      {isFetchingProjects ? (
        <LinearProgress color="primary" />
      ) : (
        <>
          <SearchBar label="Search project" onChange={handleSearch} />
          <CustomTable
            tableHeader="Projects list"
            dataSource={dataSource}
            columns={columnSchema}
            headerActions={headerActions}
            cellActions={tableCellActions}
          />
        </>
      )}
    </>
  );
};

export default ProjectsPage;
