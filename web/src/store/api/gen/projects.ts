import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    projectsControllerCreate: build.mutation<
      ProjectsControllerCreateResponse,
      ProjectsControllerCreateArgs
    >({
      query: (queryArg) => ({
        url: `/api/projects`,
        method: "POST",
        body: queryArg.createProjectsDto,
      }),
    }),
    projectsControllerFetch: build.query<
      ProjectsControllerFetchResponse,
      ProjectsControllerFetchArgs
    >({
      query: () => ({ url: `/api/projects` }),
    }),
    projectsControllerUpdate: build.mutation<
      ProjectsControllerUpdateResponse,
      ProjectsControllerUpdateArgs
    >({
      query: (queryArg) => ({
        url: `/api/projects/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createProjectsDto,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type ProjectsControllerCreateResponse = unknown;
export type ProjectsControllerCreateArgs = {
  createProjectsDto: CreateProjectsDto;
};
export type ProjectsControllerFetchResponse =
  /** status 200  */ FindAllProjectsDto[];
export type ProjectsControllerFetchArgs = void;
export type ProjectsControllerUpdateResponse = unknown;
export type ProjectsControllerUpdateArgs = {
  id: number;
  createProjectsDto: CreateProjectsDto;
};
export type CreateProjectsDto = {
  projectName: string;
  description: string;
  startDate: string;
  endDate?: string;
  officialId: number;
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
export type FindAllProjectsDto = {
  id: number;
  projectName: string;
  description: string;
  startDate: string;
  endDate?: string;
  official?: Officials;
};
export const {
  useProjectsControllerCreateMutation,
  useProjectsControllerFetchQuery,
  useProjectsControllerUpdateMutation,
} = injectedRtkApi;
