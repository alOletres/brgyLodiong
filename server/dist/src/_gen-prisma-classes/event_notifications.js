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
exports.EventNotifications = void 0;
const residents_1 = require("./residents");
const events_1 = require("./events");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class EventNotifications {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], EventNotifications.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], EventNotifications.prototype, "residentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], EventNotifications.prototype, "eventId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.NOTIFICATION_TYPE, enumName: 'NOTIFICATION_TYPE' }),
    __metadata("design:type", String)
], EventNotifications.prototype, "notificationType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.NOTIFICATION_STATUS, enumName: 'NOTIFICATION_STATUS' }),
    __metadata("design:type", String)
], EventNotifications.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    __metadata("design:type", Date)
], EventNotifications.prototype, "sentAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: () => residents_1.Residents }),
    __metadata("design:type", Array)
], EventNotifications.prototype, "residents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: () => events_1.Events }),
    __metadata("design:type", Array)
], EventNotifications.prototype, "events", void 0);
exports.EventNotifications = EventNotifications;
//# sourceMappingURL=event_notifications.js.map