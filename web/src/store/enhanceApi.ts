import { enhancedApi as authApi } from "@/store/api/gen/auth";

const enhancedAuthApi = authApi.enhanceEndpoints({
  addTagTypes: ["auth"],
  endpoints: {
    appControllerLogin: {
      invalidatesTags: ["auth"],
    },
  },
});

export { enhancedAuthApi as authApi };
