"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const application_config_1 = require("./application.config");
const promises_1 = require("fs/promises");
const path_1 = require("path");
let app;
async function bootstrap() {
    app = await (0, application_config_1.createApplication)();
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });
    const expressApp = app;
    expressApp.useStaticAssets((0, path_1.join)(process.cwd(), 'uploads'), {
        prefix: '/uploads',
    });
    const document = (0, application_config_1.createSwaggerDocument)(app);
    await (0, promises_1.writeFile)('./swagger.json', JSON.stringify(document, null, '  '));
    swagger_1.SwaggerModule.setup('api/swagger', app, document);
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map