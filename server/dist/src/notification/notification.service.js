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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let NotificationService = class NotificationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(payload) {
        try {
            await this.prisma.notifications.create({ data: Object.assign({}, payload) });
        }
        catch (err) {
            throw err;
        }
    }
    async fetch() {
        try {
            const result = await this.prisma.notifications.findMany({
                select: {
                    id: true,
                    residents: {
                        select: {
                            id: true,
                            firstname: true,
                            lastname: true,
                            contact: true,
                            email: true,
                        },
                    },
                    requests: {
                        select: { requestMode: true, requestType: true, purpose: true },
                    },
                    notificationType: true,
                    message: true,
                    sentAt: true,
                },
                orderBy: { sentAt: client_1.Prisma.SortOrder.desc },
            });
            return result.map((value) => {
                const { residents, requests } = value, data = __rest(value, ["residents", "requests"]);
                return Object.assign(Object.assign({}, data), { firstname: residents.firstname, lastname: residents.lastname, contact: residents.contact, email: residents.email, requestMode: requests.requestMode, requestType: requests.requestType, purpose: requests.purpose, residentId: residents.id });
            });
        }
        catch (err) {
            throw err;
        }
    }
};
NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map