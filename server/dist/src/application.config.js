"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSwaggerDocument = exports.createApplication = exports.createStandaloneApplication = void 0;
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const global_settings_1 = require("./global.settings");
const createStandaloneApplication = async (options) => {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule, options);
    return app;
};
exports.createStandaloneApplication = createStandaloneApplication;
const createApplication = async (options = {}) => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, options);
    (0, global_settings_1.setGlobalSetting)(app);
    return app;
};
exports.createApplication = createApplication;
function createSwaggerDocument(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Brgy Lodiong Document Request APIs documents')
        .build();
    return swagger_1.SwaggerModule.createDocument(app, config);
}
exports.createSwaggerDocument = createSwaggerDocument;
//# sourceMappingURL=application.config.js.map