import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    notificationControllerFetch: build.query<
      NotificationControllerFetchResponse,
      NotificationControllerFetchArgs
    >({
      query: () => ({ url: `/api/notification` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type NotificationControllerFetchResponse =
  /** status 200  */ FindAllNotificationsDto[];
export type NotificationControllerFetchArgs = void;
export type NotificationType = "SMS" | "EMAIL";
export type RequestMode = "WALKIN" | "ONLINE";
export type FindAllNotificationsDto = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  notificationType: NotificationType;
  message: string;
  sentAt: string;
  requestMode: RequestMode;
  purpose: string;
  requestType: string;
  residentId: number;
};
export const { useNotificationControllerFetchQuery } = injectedRtkApi;
