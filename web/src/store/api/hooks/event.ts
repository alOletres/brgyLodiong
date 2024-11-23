import { eventApi } from "@/store/enhanceApi";
import { CreateEventsDto } from "../gen/event";
import { handleErrors } from "@/utils/error";
export const useEventsApi = () => {
  const { isFetching: isFetchingEvents, data: events } =
    eventApi.useEventsControllerFetchQuery();

  const [create] = eventApi.useEventsControllerCreateMutation();
  const [update] = eventApi.useEventsControllerUpdateMutation();

  const handleCreate = async (payload: CreateEventsDto) => {
    try {
      const result = await create({ createEventsDto: payload });
      handleErrors(result);
    } catch (err) {
      throw err;
    }
  };

  const handleUpdate = async (id: number, payload: CreateEventsDto) => {
    try {
      const result = await update({ id, createEventsDto: payload });

      handleErrors(result);
    } catch (err) {
      throw err;
    }
  };

  return { isFetchingEvents, events, handleCreate, handleUpdate };
};
