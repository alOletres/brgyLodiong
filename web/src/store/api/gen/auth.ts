import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    appControllerLogin: build.mutation<
      AppControllerLoginResponse,
      AppControllerLoginArgs
    >({
      query: () => ({ url: `/api/login`, method: "POST" }),
    }),
    appControllerChangePassword: build.mutation<
      AppControllerChangePasswordResponse,
      AppControllerChangePasswordArgs
    >({
      query: (queryArg) => ({
        url: `/api/${queryArg.email}`,
        method: "PUT",
        body: queryArg.changePasswordDto,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type AppControllerLoginResponse = unknown;
export type AppControllerLoginArgs = void;
export type AppControllerChangePasswordResponse = unknown;
export type AppControllerChangePasswordArgs = {
  email: string;
  changePasswordDto: ChangePasswordDto;
};
export type ChangePasswordDto = {};
export const {
  useAppControllerLoginMutation,
  useAppControllerChangePasswordMutation,
} = injectedRtkApi;
