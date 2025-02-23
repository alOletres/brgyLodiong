"use client";
import LinearLoader from "@/components/LinearLoader";
import { useHooks } from "./hook";
import CustomTable from "@/components/Table";

const NotificationsPage = () => {
  const { isFetchingNotification, columnSchema, dataSource } = useHooks();

  return (
    <>
      {isFetchingNotification && <LinearLoader height={4} />}
      <CustomTable
        tableHeader="Transaction History"
        columns={columnSchema}
        dataSource={dataSource}
      />
    </>
  );
};

export default NotificationsPage;
