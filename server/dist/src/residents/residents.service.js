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
exports.ResidentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcypt_1 = require("../lib/bcypt");
let ResidentsService = class ResidentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(_a) {
        var { password, role = 'RESIDENT' } = _a, payload = __rest(_a, ["password", "role"]);
        try {
            const hash = (0, bcypt_1.hashPassword)(password);
            await this.prisma.residents.create({
                data: Object.assign(Object.assign({}, payload), { Auth: {
                        create: {
                            email: payload.email,
                            password: hash,
                            role,
                        },
                    } }),
            });
        }
        catch (err) {
            throw err;
        }
    }
    async update(id, _a) {
        var { password, role } = _a, payload = __rest(_a, ["password", "role"]);
        try {
            const hash = (0, bcypt_1.hashPassword)(password);
            await this.prisma.residents.update({
                where: { id },
                data: Object.assign(Object.assign({}, payload), { Auth: {
                        update: {
                            email: payload.email,
                            password: hash,
                            role: role,
                        },
                    } }),
            });
        }
        catch (err) {
            throw err;
        }
    }
    async fetch() {
        try {
            const residents = await this.prisma.residents.findMany({
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                    address: true,
                    contact: true,
                    Auth: {
                        select: { role: true, status: true },
                    },
                },
            });
            return residents.map((value) => {
                const { Auth } = value, data = __rest(value, ["Auth"]);
                return Object.assign(Object.assign({}, data), { role: Auth.role, status: Auth.status });
            });
        }
        catch (err) {
            throw err;
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.residents.findUnique({ where: { id } });
        }
        catch (err) {
            throw err;
        }
    }
};
ResidentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ResidentsService);
exports.ResidentsService = ResidentsService;
//# sourceMappingURL=residents.service.js.map