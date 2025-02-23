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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjectsService = class ProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(payload) {
        try {
            await this.prisma.projects.create({ data: Object.assign({}, payload) });
        }
        catch (err) {
            throw err;
        }
    }
    async update(id, payload) {
        try {
            await this.prisma.projects.update({
                where: { id },
                data: Object.assign({}, payload),
            });
        }
        catch (err) {
            throw err;
        }
    }
    async uploadFiles(id, files) {
        try {
            await this.prisma.projects.update({
                where: { id },
                data: { documents: JSON.stringify(files) },
            });
        }
        catch (err) {
            throw err;
        }
    }
    async fetch() {
        const projects = await this.prisma.projects.findMany({
            select: {
                id: true,
                members: true,
                projectName: true,
                description: true,
                startDate: true,
                endDate: true,
                officialId: true,
                documents: true,
                official: {
                    select: {
                        firstname: true,
                        lastname: true,
                        position: true,
                    },
                },
                status: true,
            },
        });
        return projects.map((value) => {
            const { official } = value, data = __rest(value, ["official"]);
            return Object.assign(Object.assign({}, data), { officialName: `${official.position} ${official.firstname} ${official.lastname}` });
        });
    }
};
ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
exports.ProjectsService = ProjectsService;
//# sourceMappingURL=projects.service.js.map