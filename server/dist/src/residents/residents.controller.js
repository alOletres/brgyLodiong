"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResidentsController = void 0;
const common_1 = require("@nestjs/common");
const residents_service_1 = require("./residents.service");
const create_residents_dto_1 = require("./dto/create-residents.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const find_all_residents_dto_1 = require("./dto/find-all.residents.dto");
const client_1 = require("@prisma/client");
let ResidentsController = class ResidentsController {
    constructor(residentService) {
        this.residentService = residentService;
    }
    async create(payload) {
        await this.residentService.create(payload);
    }
    async update(id, payload) {
        await this.residentService.update(id, payload);
    }
    async fetch() {
        return this.residentService.fetch();
    }
    async fetchByStatus(status) {
        return this.residentService.fetchByStatus(status);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_residents_dto_1.CreateResidentsDto]),
    __metadata("design:returntype", Promise)
], ResidentsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_residents_dto_1.CreateResidentsDto]),
    __metadata("design:returntype", Promise)
], ResidentsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    (0, swagger_1.ApiExtraModels)(find_all_residents_dto_1.FindAllResidentsDto),
    (0, swagger_1.ApiResponse)({ type: find_all_residents_dto_1.FindAllResidentsDto, isArray: true, status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResidentsController.prototype, "fetch", null);
__decorate([
    (0, common_1.Get)('/:status'),
    (0, swagger_1.ApiExtraModels)(find_all_residents_dto_1.FindAllResidentsDto),
    (0, swagger_1.ApiResponse)({ type: find_all_residents_dto_1.FindAllResidentsDto, isArray: true, status: 200 }),
    __param(0, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResidentsController.prototype, "fetchByStatus", null);
ResidentsController = __decorate([
    (0, common_1.Controller)('residents'),
    __metadata("design:paramtypes", [residents_service_1.ResidentsService])
], ResidentsController);
exports.ResidentsController = ResidentsController;
//# sourceMappingURL=residents.controller.js.map