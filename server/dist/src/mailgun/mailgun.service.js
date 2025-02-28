"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailgunService = void 0;
const common_1 = require("@nestjs/common");
const mailgun_js_1 = __importDefault(require("mailgun.js"));
const form_data_1 = __importDefault(require("form-data"));
let MailgunService = class MailgunService {
    constructor() {
        this.client = new mailgun_js_1.default(form_data_1.default).client({
            username: 'api',
            key: process.env.MAILGUN_KEY,
        });
    }
    async sendMail(data) {
        try {
            const response = await this.client.messages.create(process.env.MAILGUN_DOMAIN, Object.assign(Object.assign({}, data), { from: 'sandbox64f2849500814639a693339686fd10da.mailgun.org', subject: 'Brgy. Lower Lodiong Notification' }));
            console.log('Mail gun response', response, 'data', data);
        }
        catch (err) {
            console.log('Mail gun error', err);
        }
    }
};
MailgunService = __decorate([
    (0, common_1.Injectable)()
], MailgunService);
exports.MailgunService = MailgunService;
//# sourceMappingURL=mailgun.service.js.map