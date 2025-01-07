"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResidentsModule = void 0;
const common_1 = require("@nestjs/common");
const residents_controller_1 = require("./residents.controller");
const residents_service_1 = require("./residents.service");
const prisma_service_1 = require("../prisma/prisma.service");
let ResidentsModule = class ResidentsModule {
};
ResidentsModule = __decorate([
    (0, common_1.Module)({
        controllers: [residents_controller_1.ResidentsController],
        providers: [residents_service_1.ResidentsService, prisma_service_1.PrismaService],
    })
], ResidentsModule);
exports.ResidentsModule = ResidentsModule;
//# sourceMappingURL=residents.module.js.map