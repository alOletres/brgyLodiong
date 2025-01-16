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
exports.FindAllNotificationsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class FindAllNotificationsDto {
    constructor() {
        this.requestMode = client_1.REQUEST_MODE.ONLINE;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], FindAllNotificationsDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], FindAllNotificationsDto.prototype, "firstname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], FindAllNotificationsDto.prototype, "lastname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], FindAllNotificationsDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], FindAllNotificationsDto.prototype, "contact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.NOTIFICATION_TYPE, enumName: 'NOTIFICATION_TYPE' }),
    __metadata("design:type", String)
], FindAllNotificationsDto.prototype, "notificationType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], FindAllNotificationsDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    __metadata("design:type", Date)
], FindAllNotificationsDto.prototype, "sentAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.REQUEST_MODE, enumName: 'REQUEST_MODE' }),
    __metadata("design:type", String)
], FindAllNotificationsDto.prototype, "requestMode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], FindAllNotificationsDto.prototype, "purpose", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], FindAllNotificationsDto.prototype, "requestType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], FindAllNotificationsDto.prototype, "residentId", void 0);
exports.FindAllNotificationsDto = FindAllNotificationsDto;
//# sourceMappingURL=findall-notifications.dto.js.map