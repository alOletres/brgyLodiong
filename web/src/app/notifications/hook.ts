import { DecodedTokenValues } from "@/components/hooks/useDrawer";
import { ColumnSchema } from "@/components/Table";
import { decodeToken } from "@/lib/tokenStorage";
import { FindAllNotificationsDto } from "@/store/api/gen/notification";
import { useNotificationApi } from "@/store/api/hooks/notification";
import { useEffect, useState } from "react";

export const useHooks = () => {
  const { isFetchingNotification, notifications } = useNotificationApi();

  const [user, setUser] = useState<DecodedTokenValues>(
    {} as DecodedTokenValues
  );

  const [dataSource, setDataSource] = useState<FindAllNotificationsDto[]>([]);

  useEffect(
    () => {
      const decoded = decodeToken() as DecodedTokenValues;

      if (decoded) {
        setUser(decoded);
      }

      if (notifications?.length) {
        if (user?.role === "RESIDENT") {
          const filteredData = notifications.filter(
            (notif) => notif.residentId === user.resident.id
          );

          setDataSource(filteredData);
        } else {
          setDataSource(notifications);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [notifications]
  );

  const columnSchema: ColumnSchema<FindAllNotificationsDto>[] = [
    { key: "requestMode", label: "type" },
    { key: "requestType", label: "request type" },
    { key: "purpose", label: "purpose" },
    { key: "notificationType", label: "notification type" },
    { key: "message", label: "message" },
    { key: "sentAt", label: "sent at" },
  ];

  return { isFetchingNotification, dataSource, columnSchema };
};
