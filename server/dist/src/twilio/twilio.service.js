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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioService = void 0;
const common_1 = require("@nestjs/common");
const moment_1 = __importDefault(require("moment"));
const twilio_1 = __importDefault(require("twilio"));
let TwilioService = class TwilioService {
    constructor() {
        this.config = {
            accountSid: process.env.TWILIO_ACCOUNT_SID,
            authToken: process.env.TWILIO_AUTH_TOKEN,
            twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
        };
        this.twilioClient = (0, twilio_1.default)(this.config.accountSid, this.config.authToken);
    }
    async sendSms(to, body) {
        await this.twilioClient.messages.create({
            body,
            from: this.config.twilioPhoneNumber,
            to,
        });
    }
    notifyResident(residentName, requestType, status) {
        switch (status) {
            case 'APPROVED':
                return `
        Dear ${residentName}, We are pleased to inform you that your request for a Certificate of ${requestType} has been approved. You may now proceed to the barangay office to claim your certificate. Please bring a valid ID. Open within working hours fom 8am to 5pm, closed weekends, and holidays. If you have any questions or require further assistance, please don’t hesitate to contact us. thank you for your cooperation`;
            case 'COMPLETED':
                return `
        Dear ${residentName}, Your request for a Certificate of ${requestType} has been successfully completed. You may now claim it at the barangay office during office hours.`;
            case 'CLAIMED':
                return `
        Dear ${residentName}, This is to confirm that your requested Certificate of ${requestType} has been successfully claimed from the barangay office on ${(0, moment_1.default)(new Date()).format('ll')}`;
            case 'UNCLAIMED':
                return `
        Dear ${residentName}, We would like to remind you that your requested Certificate of ${requestType} is ready for pickup at the barangay office`;
            case 'REJECTED':
                return `
        Dear ${residentName}, We regret to inform you that your request for a Certificate of ${requestType} has been rejected, If you have any questions, feel free to visit the barangay office for further clarification.`;
        }
    }
};
TwilioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TwilioService);
exports.TwilioService = TwilioService;
//# sourceMappingURL=twilio.service.js.map