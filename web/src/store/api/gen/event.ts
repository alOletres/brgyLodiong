import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    eventsControllerCreate: build.mutation<
      EventsControllerCreateResponse,
      EventsControllerCreateArgs
    >({
      query: (queryArg) => ({
        url: `/api/events`,
        method: "POST",
        body: queryArg.createEventsDto,
      }),
    }),
    eventsControllerFetch: build.query<
      EventsControllerFetchResponse,
      EventsControllerFetchArgs
    >({
      query: () => ({ url: `/api/events` }),
    }),
    eventsControllerUpdate: build.mutation<
      EventsControllerUpdateResponse,
      EventsControllerUpdateArgs
    >({
      query: (queryArg) => ({
        url: `/api/events/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createEventsDto,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type EventsControllerCreateResponse = unknown;
export type EventsControllerCreateArgs = {
  createEventsDto: CreateEventsDto;
};
export type EventsControllerFetchResponse =
  /** status 200  */ FindAllEventsDto[];
export type EventsControllerFetchArgs = void;
export type EventsControllerUpdateResponse = unknown;
export type EventsControllerUpdateArgs = {
  id: number;
  createEventsDto: CreateEventsDto;
};
export type CreateEventsDto = {
  eventName: string;
  description: string;
  eventDate: string;
  location: string;
};
export type FindAllEventsDto = {
  id: number;
  eventName: string;
  description: string;
  eventDate: string;
  location: string;
  createdAt: string;
};
export const {
  useEventsControllerCreateMutation,
  useEventsControllerFetchQuery,
  useEventsControllerUpdateMutation,
} = injectedRtkApi;
