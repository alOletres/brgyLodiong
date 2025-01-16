import { notificationApi } from "@/store/enhanceApi";

export const useNotificationApi = () => {
  const { isFetching: isFetchingNotification, data: notifications } =
    notificationApi.useNotificationControllerFetchQuery();

  return { isFetchingNotification, notifications };
};
