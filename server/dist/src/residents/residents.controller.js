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
const swagger_1 = require("@nestjs/swagger");
const find_all_residents_dto_1 = require("./dto/find-all.residents.dto");
const client_1 = require("@prisma/client");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("../lib/multer");
const filereader_1 = require("../lib/filereader");
let ResidentsController = class ResidentsController {
    constructor(residentService) {
        this.residentService = residentService;
    }
    async create(payload, image) {
        const imageFile = (0, filereader_1.generateFileName)(image);
        console.log('payload', payload, image);
        await this.residentService.create(Object.assign(Object.assign({}, payload), { image: imageFile }));
    }
    async update(id, payload, image) {
        console.log('payload', payload, image);
        const imageFile = (0, filereader_1.generateFileName)(image);
        await this.residentService.update(id, Object.assign(Object.assign({}, payload), { image: imageFile }));
    }
    async fetch() {
        return this.residentService.fetch();
    }
    async fetchByStatus(status) {
        return this.residentService.fetchByStatus(status);
    }
    async updateResidentStatus(id, status) {
        return await this.residentService.updateResidentStatus(id, status);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', multer_1.multerOption)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_residents_dto_1.CreateResidentsDto, Object]),
    __metadata("design:returntype", Promise)
], ResidentsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', multer_1.multerOption)),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_residents_dto_1.CreateResidentsDto, Object]),
    __metadata("design:returntype", Promise)
], ResidentsController.prototype, "update", null);
__decorate([
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
__decorate([
    (0, common_1.Put)('status/:id/:status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], ResidentsController.prototype, "updateResidentStatus", null);
ResidentsController = __decorate([
    (0, common_1.Controller)('residents'),
    __metadata("design:paramtypes", [residents_service_1.ResidentsService])
], ResidentsController);
exports.ResidentsController = ResidentsController;
//# sourceMappingURL=residents.controller.js.map