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
exports.RequestService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const twilio_service_1 = require("../twilio/twilio.service");
const residents_service_1 = require("../residents/residents.service");
const notification_service_1 = require("../notification/notification.service");
const email_service_1 = require("../email/email.service");
let RequestService = class RequestService {
    constructor(prisma, twilioService, residentService, notificationService, emailService) {
        this.prisma = prisma;
        this.twilioService = twilioService;
        this.residentService = residentService;
        this.notificationService = notificationService;
        this.emailService = emailService;
        this.selectRequestProperties = {
            id: true,
            requestType: true,
            status: true,
            dateRequested: true,
            dateCompleted: true,
            purpose: true,
            requestMode: true,
            residentId: true,
            rejectionReason: true,
            resident: {
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    address: true,
                    email: true,
                    contact: true,
                    civilStatus: true,
                },
            },
        };
    }
    async create(payload) {
        try {
            const isCompleted = payload.status === client_1.REQUEST_STATUS.COMPLETED;
            return await this.prisma.requests.create({
                data: Object.assign(Object.assign({}, payload), { dateCompleted: isCompleted ? new Date().toISOString() : undefined }),
            });
        }
        catch (err) {
            throw err;
        }
    }
    async update(id, payload) {
        try {
            const isCompleted = payload.status === client_1.REQUEST_STATUS.COMPLETED;
            if (payload.status !== 'PENDING') {
                const { firstname, lastname, contact, email } = await this.residentService.findOne(payload.residentId);
                const completeName = `${firstname} ${lastname}`;
                const body = this.twilioService.notifyResident(completeName, payload.requestType, payload.status);
                await this.emailService.sendMail({ message: body, to: email });
                await this.twilioService.sendSms(contact, body);
                await this.notificationService.create({
                    message: body,
                    notificationType: 'SMS',
                    requestId: id,
                    residentId: payload.residentId,
                    status: 'SENT',
                });
            }
            return await this.prisma.requests.update({
                where: { id },
                data: Object.assign(Object.assign({}, payload), { dateCompleted: isCompleted ? new Date().toISOString() : undefined }),
            });
        }
        catch (err) {
            console.log('error', err);
            throw err;
        }
    }
    async fetch() {
        const requests = await this.prisma.requests.findMany({
            select: Object.assign({}, this.selectRequestProperties),
            orderBy: { dateRequested: client_1.Prisma.SortOrder.desc },
        });
        return requests.map((value) => {
            const { resident } = value, data = __rest(value, ["resident"]);
            return Object.assign(Object.assign({}, data), { requestedId: resident.id, requestedBy: `${resident.firstname} ${resident.lastname}`, address: resident.address, contact: resident.contact, email: resident.email, civilStatus: resident.civilStatus });
        });
    }
    async findByResident(id) {
        try {
            const requests = await this.prisma.requests.findMany({
                where: { residentId: id },
                select: Object.assign({}, this.selectRequestProperties),
                orderBy: { dateRequested: client_1.Prisma.SortOrder.desc },
            });
            return requests.map((value) => {
                const { resident } = value, data = __rest(value, ["resident"]);
                return Object.assign(Object.assign({}, data), { requestedId: resident.id, requestedBy: `${resident.firstname} ${resident.lastname}`, address: resident.address, contact: resident.contact, email: resident.email, civilStatus: resident.civilStatus });
            });
        }
        catch (err) {
            throw err;
        }
    }
};
RequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        twilio_service_1.TwilioService,
        residents_service_1.ResidentsService,
        notification_service_1.NotificationService,
        email_service_1.EmailService])
], RequestService);
exports.RequestService = RequestService;
//# sourceMappingURL=request.service.js.map