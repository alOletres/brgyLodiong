import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    appControllerLogin: build.mutation<
      AppControllerLoginResponse,
      AppControllerLoginArgs
    >({
      query: () => ({ url: `/api/login`, method: "POST" }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type AppControllerLoginResponse = unknown;
export type AppControllerLoginArgs = void;
export const { useAppControllerLoginMutation } = injectedRtkApi;
