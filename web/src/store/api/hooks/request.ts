import { requestApi } from "@/store/enhanceApi";
import { CreateRequestDto } from "../gen/request";
import { handleErrors } from "@/utils/error";
export const useRequestApi = () => {
  const { isFetching: isFetchingRequest, data: requests } =
    requestApi.useRequestControllerFetchQuery();

  const [create] = requestApi.useRequestControllerCreateMutation();
  const [update] = requestApi.useRequestControllerUpdateMutation();

  const handleCreate = async (payload: CreateRequestDto) => {
    try {
      const result = await create({ createRequestDto: payload });
      handleErrors(result);
    } catch (err) {
      throw err;
    }
  };

  const handleUpdate = async (id: number, payload: CreateRequestDto) => {
    try {
      const result = await update({ id, createRequestDto: payload });
      handleErrors(result);
    } catch (err) {
      throw err;
    }
  };

  return { isFetchingRequest, requests, handleCreate, handleUpdate };
};
