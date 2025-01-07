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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const bcypt_1 = require("../lib/bcypt");
let AuthService = class AuthService {
    constructor(prismaService, jwtService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
    async validateUser({ email, password }) {
        const _a = await this.findOneUser(email), { password: hashPassword } = _a, data = __rest(_a, ["password"]);
        const isMatch = (0, bcrypt_1.compareSync)(password, hashPassword);
        if (!isMatch)
            return null;
        return data;
    }
    async login(user) {
        const access_token = this.jwtService.sign(user, {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: '1d',
        });
        return {
            access_token,
        };
    }
    async findOneUser(email) {
        return await this.prismaService.auth.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                password: true,
                status: true,
                role: true,
                lastLoggedIn: true,
                resident: {
                    select: {
                        firstname: true,
                        lastname: true,
                        contact: true,
                        address: true,
                    },
                },
            },
        });
    }
    async changePassword(email, { currentPassword, newPassword }) {
        try {
            const { password: hashText } = await this.prismaService.auth.findUnique({
                where: { email },
            });
            const isMatch = (0, bcrypt_1.compareSync)(currentPassword, hashText);
            if (!isMatch)
                throw new common_1.BadRequestException('Current Password is incorrect');
            const password = (0, bcypt_1.hashPassword)(newPassword);
            await this.prismaService.auth.update({
                where: { email },
                data: { password },
            });
        }
        catch (err) {
            throw err;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map