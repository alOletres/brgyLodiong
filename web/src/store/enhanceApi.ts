import { enhancedApi as authApi } from "@/store/api/gen/auth";
import { enhancedApi as officialsApi } from "@/store/api/gen/officials";
import { enhancedApi as projectsApi } from "@/store/api/gen/projects";
import { enhancedApi as residentsApi } from "@/store/api/gen/residents";

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

const enhanceProjectsApi = projectsApi.enhanceEndpoints({
  addTagTypes: ["projects"],
  endpoints: {
    projectsControllerFetch: {
      providesTags: ["projects"],
    },
    projectsControllerCreate: {
      invalidatesTags: ["projects"],
    },
    projectsControllerUpdate: {
      invalidatesTags: ["projects"],
    },
  },
});

const enhanceResidentsApi = residentsApi.enhanceEndpoints({
  addTagTypes: ["residents"],
  endpoints: {
    residentsControllerFetch: {
      providesTags: ["residents"],
    },
    residentsControllerCreate: {
      invalidatesTags: ["residents"],
    },
    residentsControllerUpdate: {
      invalidatesTags: ["residents"],
    },
  },
});

export {
  enhancedAuthApi as authApi,
  enhanceOfficialsApi as officialsApi,
  enhanceProjectsApi as projectsApi,
  enhanceResidentsApi as residentsApi,
};
