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
exports.RequestController = void 0;
const common_1 = require("@nestjs/common");
const request_service_1 = require("./request.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_request_dto_1 = require("./dto/create-request.dto");
const swagger_1 = require("@nestjs/swagger");
const find_all_requests_dto_1 = require("./dto/find-all-requests.dto");
let RequestController = class RequestController {
    constructor(requestService) {
        this.requestService = requestService;
    }
    async create(payload) {
        return await this.requestService.create(payload);
    }
    async update(id, payload) {
        return await this.requestService.update(id, payload);
    }
    async fetch() {
        return await this.requestService.fetch();
    }
    async findByResident(id) {
        return await this.requestService.findByResident(id);
    }
};
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_request_dto_1.CreateRequestDto]),
    __metadata("design:returntype", Promise)
], RequestController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_request_dto_1.CreateRequestDto]),
    __metadata("design:returntype", Promise)
], RequestController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiExtraModels)(find_all_requests_dto_1.FindAllRequestsDto),
    (0, swagger_1.ApiResponse)({ type: find_all_requests_dto_1.FindAllRequestsDto, isArray: true, status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RequestController.prototype, "fetch", null);
__decorate([
    (0, common_1.Get)('find/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RequestController.prototype, "findByResident", null);
RequestController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('request'),
    __metadata("design:paramtypes", [request_service_1.RequestService])
], RequestController);
exports.RequestController = RequestController;
//# sourceMappingURL=request.controller.js.map