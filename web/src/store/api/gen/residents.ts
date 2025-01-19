import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    residentsControllerCreate: build.mutation<
      ResidentsControllerCreateResponse,
      ResidentsControllerCreateArgs
    >({
      query: (queryArg) => ({
        url: `/api/residents`,
        method: "POST",
        body: queryArg.createResidentsDto,
      }),
    }),
    residentsControllerFetch: build.query<
      ResidentsControllerFetchResponse,
      ResidentsControllerFetchArgs
    >({
      query: () => ({ url: `/api/residents` }),
    }),
    residentsControllerUpdate: build.mutation<
      ResidentsControllerUpdateResponse,
      ResidentsControllerUpdateArgs
    >({
      query: (queryArg) => ({
        url: `/api/residents/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createResidentsDto,
      }),
    }),
    residentsControllerFetchByStatus: build.query<
      ResidentsControllerFetchByStatusResponse,
      ResidentsControllerFetchByStatusArgs
    >({
      query: (queryArg) => ({ url: `/api/residents/${queryArg.status}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type ResidentsControllerCreateResponse = unknown;
export type ResidentsControllerCreateArgs = {
  createResidentsDto: CreateResidentsDto;
};
export type ResidentsControllerFetchResponse =
  /** status 200  */ FindAllResidentsDto[];
export type ResidentsControllerFetchArgs = void;
export type ResidentsControllerUpdateResponse = unknown;
export type ResidentsControllerUpdateArgs = {
  id: number;
  createResidentsDto: CreateResidentsDto;
};
export type ResidentsControllerFetchByStatusResponse =
  /** status 200  */ FindAllResidentsDto[];
export type ResidentsControllerFetchByStatusArgs = {
  status: string;
};
export type CivilStatus = "SINGLE" | "MARRIED" | "WIDOW";
export type ResidentStatus = "PENDING" | "REGISTERED" | "DISAPPROVED";
export type CreateResidentsDto = {
  civilStatus: CivilStatus;
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  address: string;
  role: "ADMIN" | "RESIDENT";
  password: string;
  status: ResidentStatus;
  disApprovedReason?: string;
};
export type UserRole = "ADMIN" | "RESIDENT";
export type FindAllResidentsDto = {
  id: number;
  firstname: string;
  civilStatus: CivilStatus;
  lastname: string;
  email: string;
  contact: string;
  address: string;
  createdAt: string;
  status: ResidentStatus;
  disApprovedReason?: string;
  role: UserRole;
};
export const {
  useResidentsControllerCreateMutation,
  useResidentsControllerFetchQuery,
  useResidentsControllerUpdateMutation,
  useResidentsControllerFetchByStatusQuery,
} = injectedRtkApi;
