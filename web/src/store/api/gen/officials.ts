import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    officialsControllerCreate: build.mutation<
      OfficialsControllerCreateResponse,
      OfficialsControllerCreateArgs
    >({
      query: (queryArg) => ({
        url: `/api/officials`,
        method: "POST",
        body: queryArg.createOfficialsDto,
      }),
    }),
    officialsControllerFetch: build.query<
      OfficialsControllerFetchResponse,
      OfficialsControllerFetchArgs
    >({
      query: () => ({ url: `/api/officials` }),
    }),
    officialsControllerUpdate: build.mutation<
      OfficialsControllerUpdateResponse,
      OfficialsControllerUpdateArgs
    >({
      query: (queryArg) => ({
        url: `/api/officials/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createOfficialsDto,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type OfficialsControllerCreateResponse = unknown;
export type OfficialsControllerCreateArgs = {
  createOfficialsDto: CreateOfficialsDto;
};
export type OfficialsControllerFetchResponse =
  /** status 200  */ FindAllOfficialsDto[];
export type OfficialsControllerFetchArgs = void;
export type OfficialsControllerUpdateResponse = unknown;
export type OfficialsControllerUpdateArgs = {
  id: number;
  createOfficialsDto: CreateOfficialsDto;
};
export type Officials = {
  id: number;
  firstname: string;
  lastname: string;
  position: string;
  startTerm: string;
  endTerm?: string;
  achievements?: string;
  Projects: Projects[];
  projectsId?: number;
};
export type Projects = {
  id: number;
  projectName: string;
  description: string;
  startDate: string;
  endDate?: string;
  officialId: number;
  official?: Officials;
};
export type CreateOfficialsDto = {
  firstname: string;
  lastname: string;
  position: string;
  startTerm: string;
  endTerm?: string;
  achievements: string;
  Projects?: Projects;
  projectsId?: number;
};
export type FindAllOfficialsDto = {
  id: number;
  firstname: string;
  lastname: string;
  position: string;
  startTerm: string;
  endTerm?: string;
  achievements?: string;
  Projects: Projects[];
  projectsId?: number;
};
export const {
  useOfficialsControllerCreateMutation,
  useOfficialsControllerFetchQuery,
  useOfficialsControllerUpdateMutation,
} = injectedRtkApi;
