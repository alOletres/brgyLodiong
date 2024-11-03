import { enhancedApi as authApi } from "@/store/api/gen/auth";
import { enhancedApi as officialsApi } from "@/store/api/gen/officials";

const enhancedAuthApi = authApi.enhanceEndpoints({
  addTagTypes: ["auth"],
  endpoints: {
    appControllerLogin: {
      invalidatesTags: ["auth"],
    },
  },
});

const enhanceOfficialsApi = officialsApi.enhanceEndpoints({
  addTagTypes: ["officials"],
  endpoints: {
    officialsControllerFetch: {
      providesTags: ["officials"],
    },
    officialsControllerCreate: {
      invalidatesTags: ["officials"],
    },
    officialsControllerUpdate: {
      invalidatesTags: ["officials"],
    },
  },
});

export { enhancedAuthApi as authApi, enhanceOfficialsApi as officialsApi };
