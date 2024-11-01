import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "../server/swagger.json",
  apiFile: "./src/store/api/baseApi.ts",
  apiImport: "baseApi",
  argSuffix: "Args",
  hooks: true,
  responseSuffix: "Response",
  outputFiles: {
    "./src/store/api/gen/auth.ts": {
      filterEndpoints: [/appController/],
    },
    "./src/store/api/gen/officials.ts": {
      filterEndpoints: [/officialsController/],
    },
    "./src/store/api/gen/projects.ts": {
      filterEndpoints: [/projectsController/],
    },
    "./src/store/api/gen/request.ts": {
      filterEndpoints: [/requestController/],
    },
    "./src/store/api/gen/residents.ts": {
      filterEndpoints: [/residentsController/],
    },
  },
};

export default config;
