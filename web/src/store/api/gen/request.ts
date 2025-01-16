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
    requestControllerFindByResident: build.query<
      RequestControllerFindByResidentResponse,
      RequestControllerFindByResidentArgs
    >({
      query: (queryArg) => ({ url: `/api/request/find/${queryArg.id}` }),
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
export type RequestControllerFindByResidentResponse = unknown;
export type RequestControllerFindByResidentArgs = {
  id: number;
};
export type RequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CLAIMED"
  | "UNCLAIMED"
  | "COMPLETED";
export type RequestMode = "WALKIN" | "ONLINE";
export type CreateRequestDto = {
  residentId: number;
  requestType: string;
  status: RequestStatus;
  rejectionReason?: string;
  purpose: string;
  requestMode: RequestMode;
};
export type CivilStatus = "SINGLE" | "MARRIED";
export type FindAllRequestsDto = {
  id: number;
  residentId: number;
  requestType: string;
  status: RequestStatus;
  rejectionReason?: string;
  purpose: string;
  dateRequested: string;
  dateCompleted?: string;
  requestMode: RequestMode;
  requestedId: number;
  civilStatus: CivilStatus;
  contact: string;
  email: string;
  address: string;
  requestedBy: string;
};
export const {
  useRequestControllerCreateMutation,
  useRequestControllerFetchQuery,
  useRequestControllerUpdateMutation,
  useRequestControllerFindByResidentQuery,
} = injectedRtkApi;
