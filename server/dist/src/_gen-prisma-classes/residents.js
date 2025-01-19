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
exports.Residents = void 0;
const auth_1 = require("./auth");
const requests_1 = require("./requests");
const notifications_1 = require("./notifications");
const event_notifications_1 = require("./event_notifications");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class Residents {
    constructor() {
        this.civilStatus = client_1.CIVIL_STATUS.SINGLE;
        this.status = client_1.RESIDENT_STATUS.PENDING;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], Residents.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], Residents.prototype, "firstname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.CIVIL_STATUS, enumName: 'CIVIL_STATUS' }),
    __metadata("design:type", String)
], Residents.prototype, "civilStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], Residents.prototype, "lastname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], Residents.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], Residents.prototype, "contact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], Residents.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    __metadata("design:type", Date)
], Residents.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.RESIDENT_STATUS, enumName: 'RESIDENT_STATUS' }),
    __metadata("design:type", String)
], Residents.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String }),
    __metadata("design:type", String)
], Residents.prototype, "disApprovedReason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => auth_1.Auth }),
    __metadata("design:type", auth_1.Auth)
], Residents.prototype, "Auth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: () => requests_1.Requests }),
    __metadata("design:type", Array)
], Residents.prototype, "Requests", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Number }),
    __metadata("design:type", Number)
], Residents.prototype, "requestsId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: () => notifications_1.Notifications }),
    __metadata("design:type", Array)
], Residents.prototype, "Notifications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: () => event_notifications_1.EventNotifications }),
    __metadata("design:type", Array)
], Residents.prototype, "EventNotifications", void 0);
exports.Residents = Residents;
//# sourceMappingURL=residents.js.map