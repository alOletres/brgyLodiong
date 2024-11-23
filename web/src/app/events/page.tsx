"use client";

import CustomTable from "@/components/Table";
import { useHooks } from "./hook";
import { LinearProgress } from "@mui/material";
import Modal from "@/components/Modal";
import { EventSchema } from "@/schema";
const EventsPage = () => {
  const {
    dataSource,
    columns,
    tableHeaderActions,
    isFetchingEvents,
    initialValues,
    fields,
    handleSubmit,
    btnName,
    openModal,
    handleToggleModal,
    tableCellActions,
  } = useHooks();

  return (
    <>
      <Modal
        title="Events"
        formProps={{
          initialValues,
          validationSchema: EventSchema,
          fields,
          handleSubmit,
        }}
        btnName={btnName}
        open={openModal}
        handleClose={handleToggleModal}
        width={500}
      />
      {isFetchingEvents ? (
        <LinearProgress color="primary" />
      ) : (
        <CustomTable
          tableHeader="Event list"
          dataSource={dataSource}
          columns={columns}
          headerActions={tableHeaderActions}
          cellActions={tableCellActions}
        />
      )}
    </>
  );
};

export default EventsPage;
