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
exports.Requests = void 0;
const residents_1 = require("./residents");
const notifications_1 = require("./notifications");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class Requests {
    constructor() {
        this.status = client_1.REQUEST_STATUS.PENDING;
        this.requestMode = client_1.REQUEST_MODE.ONLINE;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], Requests.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], Requests.prototype, "residentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.REQUEST_TYPE, enumName: 'REQUEST_TYPE' }),
    __metadata("design:type", String)
], Requests.prototype, "requestType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.REQUEST_STATUS, enumName: 'REQUEST_STATUS' }),
    __metadata("design:type", String)
], Requests.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], Requests.prototype, "purpose", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    __metadata("design:type", Date)
], Requests.prototype, "dateRequested", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Date }),
    __metadata("design:type", Date)
], Requests.prototype, "dateCompleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => residents_1.Residents }),
    __metadata("design:type", residents_1.Residents)
], Requests.prototype, "resident", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.REQUEST_MODE, enumName: 'REQUEST_MODE' }),
    __metadata("design:type", String)
], Requests.prototype, "requestMode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: () => notifications_1.Notifications }),
    __metadata("design:type", Array)
], Requests.prototype, "Notifications", void 0);
exports.Requests = Requests;
//# sourceMappingURL=requests.js.map