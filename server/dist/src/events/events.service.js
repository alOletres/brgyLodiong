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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const twilio_service_1 = require("../twilio/twilio.service");
const email_service_1 = require("../email/email.service");
const residents_service_1 = require("../residents/residents.service");
const moment = require("moment");
let EventsService = class EventsService {
    constructor(prisma, twilioService, emailService, residentService) {
        this.prisma = prisma;
        this.twilioService = twilioService;
        this.emailService = emailService;
        this.residentService = residentService;
    }
    async notificationBlasting(payload) {
        const registeredResidents = await this.residentService.fetchByStatus('REGISTERED');
        await Promise.all(registeredResidents.map(async (resident) => {
            const message = `Hi Mr/Mrs. ${resident.firstname} ${resident.lastname} 🎉 Join us at ${payload.location} on ${moment(payload.eventDate).format('MM/DD/YYYY')} at ${moment(payload.eventDate).format('LT')} for ${payload.eventName}. ${payload.description}`;
            await this.twilioService.sendSms(resident.contact, message);
            return resident;
        }));
    }
    async create(payload) {
        try {
            await this.prisma.events.create({ data: Object.assign({}, payload) });
            await this.notificationBlasting(payload);
        }
        catch (err) {
            throw err;
        }
    }
    async update(id, payload) {
        try {
            await this.prisma.events.update({ where: { id }, data: Object.assign({}, payload) });
            await this.notificationBlasting(payload);
        }
        catch (err) {
            throw err;
        }
    }
    async fetch() {
        return await this.prisma.events.findMany({
            orderBy: { eventDate: client_1.Prisma.SortOrder.desc },
        });
    }
};
EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        twilio_service_1.TwilioService,
        email_service_1.EmailService,
        residents_service_1.ResidentsService])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map