"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGlobalSetting = void 0;
const common_1 = require("@nestjs/common");
const compression_1 = __importDefault(require("compression"));
const express_1 = require("express");
const nestjs_pino_1 = require("nestjs-pino");
const setGlobalSetting = (app) => {
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        disableErrorMessages: false,
        whitelist: true,
    }));
    app.useGlobalInterceptors(new nestjs_pino_1.LoggerErrorInterceptor());
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.raw)({ limit: '50mb' }));
    app.use((0, express_1.text)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ limit: '50mb', extended: true }));
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Authorization',
        credentials: true,
    });
    app.use((0, compression_1.default)());
    return app;
};
exports.setGlobalSetting = setGlobalSetting;
//# sourceMappingURL=global.settings.js.map