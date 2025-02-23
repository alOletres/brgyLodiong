/* eslint-disable @typescript-eslint/no-explicit-any */
import { residentsApi } from "@/store/enhanceApi";
import { handleErrors } from "@/utils/error";
import { ResidentStatus } from "../gen/residents";
export const useResidentsApi = () => {
  const { isFetching: isFetchingResidents, data: residents } =
    residentsApi.useResidentsControllerFetchQuery();

  const { data: residentsByStatus, isFetching: isFetchingStatus } =
    residentsApi.useResidentsControllerFetchByStatusQuery({
      status: "REGISTERED",
    });

  const [create] = residentsApi.useResidentsControllerCreateMutation();
  const [update] = residentsApi.useResidentsControllerUpdateMutation();
  const [updaterResidentStatus] =
    residentsApi.useResidentsControllerUpdateResidentStatusMutation();

  const handleCreate = async (payload: FormData) => {
    try {
      const result = await create({
        createResidentsDto: payload as any,
      }).unwrap();

      handleErrors(result);
    } catch (err) {
      throw err;
    }
  };

  const handleEdit = async (id: number, payload: FormData) => {
    try {
      const result = await update({
        id,
        createResidentsDto: payload as any,
      }).unwrap();
      handleErrors(result);
    } catch (err) {
      throw err;
    }
  };

  const handleUpdateResidentStatus = async (
    id: number,
    status: ResidentStatus
  ) => {
    try {
      const result = await updaterResidentStatus({ id, status }).unwrap();

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
    handleUpdateResidentStatus,
  };
};
