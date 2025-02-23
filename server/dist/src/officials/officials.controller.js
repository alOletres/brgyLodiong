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
exports.OfficialsController = void 0;
const common_1 = require("@nestjs/common");
const officials_service_1 = require("./officials.service");
const create_official_dto_1 = require("./dto/create-official.dto");
const swagger_1 = require("@nestjs/swagger");
const find_all_dto_1 = require("./dto/find-all.dto");
let OfficialsController = class OfficialsController {
    constructor(officialsService) {
        this.officialsService = officialsService;
    }
    async create(payload) {
        await this.officialsService.create(Object.assign({}, payload));
    }
    async update(id, payload) {
        await this.officialsService.update(id, payload);
    }
    async fetch() {
        return await this.officialsService.fetch();
    }
};
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_official_dto_1.CreateOfficialsDto]),
    __metadata("design:returntype", Promise)
], OfficialsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_official_dto_1.CreateOfficialsDto]),
    __metadata("design:returntype", Promise)
], OfficialsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiExtraModels)(find_all_dto_1.FindAllOfficialsDto),
    (0, swagger_1.ApiResponse)({ status: 200, type: find_all_dto_1.FindAllOfficialsDto, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OfficialsController.prototype, "fetch", null);
OfficialsController = __decorate([
    (0, common_1.Controller)('officials'),
    __metadata("design:paramtypes", [officials_service_1.OfficialsService])
], OfficialsController);
exports.OfficialsController = OfficialsController;
//# sourceMappingURL=officials.controller.js.map