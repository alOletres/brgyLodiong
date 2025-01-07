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
exports.Auth = void 0;
const residents_1 = require("./residents");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class Auth {
    constructor() {
        this.role = client_1.USER_ROLE.RESIDENT;
        this.status = client_1.ACCOUNT_STATUS.ACTIVE;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], Auth.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], Auth.prototype, "residentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], Auth.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], Auth.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.USER_ROLE, enumName: 'USER_ROLE' }),
    __metadata("design:type", String)
], Auth.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.ACCOUNT_STATUS, enumName: 'ACCOUNT_STATUS' }),
    __metadata("design:type", String)
], Auth.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    __metadata("design:type", Date)
], Auth.prototype, "lastLoggedIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => residents_1.Residents }),
    __metadata("design:type", residents_1.Residents)
], Auth.prototype, "resident", void 0);
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map