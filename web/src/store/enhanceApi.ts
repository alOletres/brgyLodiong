import { enhancedApi as authApi } from "@/store/api/gen/auth";
import { enhancedApi as officialsApi } from "@/store/api/gen/officials";
import { enhancedApi as projectsApi } from "@/store/api/gen/projects";
import { enhancedApi as residentsApi } from "@/store/api/gen/residents";
import { enhancedApi as requestApi } from "@/store/api/gen/request";
import { enhancedApi as eventApi } from "@/store/api/gen/event";
import { enhancedApi as notificationApi } from "@/store/api/gen/notification";

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

const enhanceRequestApi = requestApi.enhanceEndpoints({
  addTagTypes: ["requests"],
  endpoints: {
    requestControllerFetch: {
      providesTags: ["requests"],
    },
    requestControllerCreate: { invalidatesTags: ["requests"] },
    requestControllerUpdate: { invalidatesTags: ["requests"] },
  },
});

const enhanceEventsApi = eventApi.enhanceEndpoints({
  addTagTypes: ["events"],
  endpoints: {
    eventsControllerFetch: {
      providesTags: ["events"],
    },
    eventsControllerCreate: {
      invalidatesTags: ["events"],
    },
    eventsControllerUpdate: {
      invalidatesTags: ["events"],
    },
  },
});

const enhanceNotificationApi = notificationApi.enhanceEndpoints({
  addTagTypes: ["notification"],
  endpoints: {
    notificationControllerFetch: {
      providesTags: ["notification"],
    },
  },
});

export {
  enhancedAuthApi as authApi,
  enhanceOfficialsApi as officialsApi,
  enhanceProjectsApi as projectsApi,
  enhanceResidentsApi as residentsApi,
  enhanceRequestApi as requestApi,
  enhanceEventsApi as eventApi,
  enhanceNotificationApi as notificationApi,
};
