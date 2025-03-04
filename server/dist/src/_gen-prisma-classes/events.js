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
exports.Events = void 0;
const event_notifications_1 = require("./event_notifications");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class Events {
    constructor() {
        this.status = client_1.EVENT_STATUS.ONGOING;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], Events.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], Events.prototype, "eventName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], Events.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    __metadata("design:type", Date)
], Events.prototype, "eventDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], Events.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    __metadata("design:type", Date)
], Events.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.EVENT_STATUS, enumName: 'EVENT_STATUS' }),
    __metadata("design:type", String)
], Events.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: () => event_notifications_1.EventNotifications }),
    __metadata("design:type", Array)
], Events.prototype, "EventNotifications", void 0);
exports.Events = Events;
//# sourceMappingURL=events.js.map