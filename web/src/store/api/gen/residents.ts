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
export type CreateResidentsDto = {
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  address: string;
  role: "ADMIN" | "RESIDENT";
  password: string;
};
export type UserRole = "ADMIN" | "RESIDENT";
export type AccountStatus = "ACTIVE" | "INACTIVE";
export type FindAllResidentsDto = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  address: string;
  role: UserRole;
  status: AccountStatus;
};
export const {
  useResidentsControllerCreateMutation,
  useResidentsControllerFetchQuery,
  useResidentsControllerUpdateMutation,
} = injectedRtkApi;
