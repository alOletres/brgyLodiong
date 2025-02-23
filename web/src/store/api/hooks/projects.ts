import { projectsApi } from "@/store/enhanceApi";
import { CreateProjectsDto } from "../gen/projects";
import { handleErrors } from "@/utils/error";
export const useProjectsApi = () => {
  const { isFetching: isFetchingProjects, data: projects } =
    projectsApi.useProjectsControllerFetchQuery();

  const [create] = projectsApi.useProjectsControllerCreateMutation();
  const [update] = projectsApi.useProjectsControllerUpdateMutation();
  const [uploadFiles] = projectsApi.useProjectsControllerUploadFilesMutation();

  const handleCreate = async (payload: CreateProjectsDto) => {
    try {
      const result = await create({ createProjectsDto: payload });

      handleErrors(result);
    } catch (err) {
      throw err;
    }
  };

  const handleUpdate = async (id: number, payload: CreateProjectsDto) => {
    try {
      const result = await update({ id, createProjectsDto: payload });
      handleErrors(result);
    } catch (err) {
      throw err;
    }
  };

  const handleUploadFiles = async (id: number, files: FormData) => {
    try {
      const result = await uploadFiles({ id, formData: files });
      handleErrors(result);
    } catch (err) {
      throw err;
    }
  };
  return {
    isFetchingProjects,
    projects,
    handleCreate,
    handleUpdate,
    handleUploadFiles,
  };
};
