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
exports.Notifications = void 0;
const residents_1 = require("./residents");
const requests_1 = require("./requests");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class Notifications {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], Notifications.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], Notifications.prototype, "residentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], Notifications.prototype, "requestId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.NOTIFICATION_TYPE, enumName: 'NOTIFICATION_TYPE' }),
    __metadata("design:type", String)
], Notifications.prototype, "notificationType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], Notifications.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.NOTIFICATION_STATUS, enumName: 'NOTIFICATION_STATUS' }),
    __metadata("design:type", String)
], Notifications.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    __metadata("design:type", Date)
], Notifications.prototype, "sentAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => residents_1.Residents }),
    __metadata("design:type", residents_1.Residents)
], Notifications.prototype, "residents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => requests_1.Requests }),
    __metadata("design:type", requests_1.Requests)
], Notifications.prototype, "requests", void 0);
exports.Notifications = Notifications;
//# sourceMappingURL=notifications.js.map