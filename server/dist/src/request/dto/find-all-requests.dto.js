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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllRequestsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const requests_1 = require("./../../_gen-prisma-classes/requests");
class FindAllRequestsDto extends (0, swagger_1.PickType)(requests_1.Requests, [
    'id',
    'requestType',
    'status',
    'purpose',
    'dateRequested',
    'dateCompleted',
    'requestMode',
    'residentId',
]) {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], FindAllRequestsDto.prototype, "contact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], FindAllRequestsDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], FindAllRequestsDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], FindAllRequestsDto.prototype, "requestedBy", void 0);
exports.FindAllRequestsDto = FindAllRequestsDto;
//# sourceMappingURL=find-all-requests.dto.js.map