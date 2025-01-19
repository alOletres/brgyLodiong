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
export type ProjectStatus = "PENDING" | "SUCCEED";
export type CreateProjectsDto = {
  projectName: string;
  members: string;
  description: string;
  startDate: string;
  endDate?: string;
  officialId: number;
  status: ProjectStatus;
};
export type FindAllProjectsDto = {
  id: number;
  members: string;
  projectName: string;
  description: string;
  startDate: string;
  endDate?: string;
  officialId: number;
  status: ProjectStatus;
  officialName: string;
};
export const {
  useProjectsControllerCreateMutation,
  useProjectsControllerFetchQuery,
  useProjectsControllerUpdateMutation,
} = injectedRtkApi;
