import { residentsApi } from "@/store/enhanceApi";
import { CreateResidentsDto } from "../gen/residents";
import { handleErrors } from "@/utils/error";
export const useResidentsApi = () => {
  const { isFetching: isFetchingResidents, data: residents } =
    residentsApi.useResidentsControllerFetchQuery();

  const { data: residentsByStatus, isFetching: isFetchingStatus } =
    residentsApi.useResidentsControllerFetchByStatusQuery({
      status: "REGISTERED",
    });

  const [create] = residentsApi.useResidentsControllerCreateMutation();
  const [update] = residentsApi.useResidentsControllerUpdateMutation();

  const handleCreate = async (payload: CreateResidentsDto) => {
    try {
      const result = await create({ createResidentsDto: payload });

      handleErrors(result);
    } catch (err) {
      throw err;
    }
  };

  const handleEdit = async (id: number, payload: CreateResidentsDto) => {
    try {
      const result = await update({ id, createResidentsDto: payload });
      handleErrors(result);
    } catch (err) {
      throw err;
    }
  };
  return {
    isFetchingResidents,
    residents,
    handleCreate,
    handleEdit,
    residentsByStatus,
    isFetchingStatus,
  };
};
