import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    requestControllerCreate: build.mutation<
      RequestControllerCreateResponse,
      RequestControllerCreateArgs
    >({
      query: (queryArg) => ({
        url: `/api/request`,
        method: "POST",
        body: queryArg.createRequestDto,
      }),
    }),
    requestControllerFetch: build.query<
      RequestControllerFetchResponse,
      RequestControllerFetchArgs
    >({
      query: () => ({ url: `/api/request` }),
    }),
    requestControllerUpdate: build.mutation<
      RequestControllerUpdateResponse,
      RequestControllerUpdateArgs
    >({
      query: (queryArg) => ({
        url: `/api/request/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createRequestDto,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type RequestControllerCreateResponse = unknown;
export type RequestControllerCreateArgs = {
  createRequestDto: CreateRequestDto;
};
export type RequestControllerFetchResponse =
  /** status 200  */ FindAllRequestsDto[];
export type RequestControllerFetchArgs = void;
export type RequestControllerUpdateResponse = unknown;
export type RequestControllerUpdateArgs = {
  id: number;
  createRequestDto: CreateRequestDto;
};
export type RequestType = "CLEARANCE" | "CERTIFICATE" | "PERMIT";
export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";
export type RequestMode = "WALKIN" | "ONLINE";
export type CreateRequestDto = {
  residentId: number;
  requestType: RequestType;
  status: RequestStatus;
  purpose: string;
  requestMode: RequestMode;
};
export type UserRole = "ADMIN" | "RESIDENT";
export type AccountStatus = "ACTIVE" | "INACTIVE";
export type Auth = {
  id: number;
  residentId: number;
  email: string;
  password: string;
  role: UserRole;
  status: AccountStatus;
  lastLoggedIn: string;
  resident: Residents;
};
export type NotificationType = "SMS" | "EMAIL";
export type NotificationStatus = "SENT" | "PENDING";
export type Notifications = {
  id: number;
  residentId: number;
  requestId: number;
  notificationType: NotificationType;
  message: string;
  status: NotificationStatus;
  sentAt: string;
  residents: Residents[];
  requests: Requests[];
};
export type Requests = {
  id: number;
  residentId: number;
  requestType: RequestType;
  status: RequestStatus;
  purpose: string;
  dateRequested: string;
  dateCompleted?: string;
  resident: Residents;
  requestMode: RequestMode;
  Notifications: Notifications[];
};
export type Events = {
  id: number;
  eventName: string;
  description: string;
  eventDate: string;
  location: string;
  createdAt: string;
  EventNotifications: EventNotifications[];
};
export type EventNotifications = {
  id: number;
  residentId: number;
  eventId: number;
  notificationType: NotificationType;
  status: NotificationStatus;
  sentAt: string;
  residents: Residents[];
  events: Events[];
};
export type Residents = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  address: string;
  createdAt: string;
  Auth?: Auth;
  Requests: Requests[];
  requestsId?: number;
  Notifications: Notifications[];
  EventNotifications: EventNotifications[];
};
export type FindAllRequestsDto = {
  id: number;
  requestType: RequestType;
  status: RequestStatus;
  purpose: string;
  dateRequested: string;
  dateCompleted?: string;
  requestMode: RequestMode;
  resident: Residents;
};
export const {
  useRequestControllerCreateMutation,
  useRequestControllerFetchQuery,
  useRequestControllerUpdateMutation,
} = injectedRtkApi;
