"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const common_1 = require("@nestjs/common");
const events_service_1 = require("./events.service");
const events_controller_1 = require("./events.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const email_service_1 = require("../email/email.service");
const twilio_service_1 = require("../twilio/twilio.service");
const residents_service_1 = require("../residents/residents.service");
const notification_service_1 = require("../notification/notification.service");
const mailgun_service_1 = require("../mailgun/mailgun.service");
let EventsModule = class EventsModule {
};
EventsModule = __decorate([
    (0, common_1.Module)({
        providers: [
            events_service_1.EventsService,
            prisma_service_1.PrismaService,
            residents_service_1.ResidentsService,
            email_service_1.EmailService,
            twilio_service_1.TwilioService,
            notification_service_1.NotificationService,
            mailgun_service_1.MailgunService,
        ],
        controllers: [events_controller_1.EventsController],
    })
], EventsModule);
exports.EventsModule = EventsModule;
//# sourceMappingURL=events.module.js.map