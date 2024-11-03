import { officialsApi } from "@/store/enhanceApi";
import { CreateOfficialsDto } from "../gen/officials";
import { handleErrors } from "@/utils/error";

export const useOfficialsApi = () => {
  const { isFetching: isFetchingOfficials, data: officials } =
    officialsApi.useOfficialsControllerFetchQuery();

  const [create] = officialsApi.useOfficialsControllerCreateMutation();

  const [update] = officialsApi.useOfficialsControllerUpdateMutation();

  const handleCreate = async (payload: CreateOfficialsDto) => {
    try {
      const result = await create({ createOfficialsDto: payload });
      handleErrors(result);
    } catch (err) {
      throw err;
    }
  };

  const handleUpdate = async (id: number, payload: CreateOfficialsDto) => {
    try {
      const result = await update({ id, createOfficialsDto: payload });

      handleErrors(result);
    } catch (err) {
      throw err;
    }
  };

  return { isFetchingOfficials, officials, handleCreate, handleUpdate };
};
