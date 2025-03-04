"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const prisma_service_1 = require("./prisma/prisma.service");
const residents_module_1 = require("./residents/residents.module");
const officials_module_1 = require("./officials/officials.module");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const request_module_1 = require("./request/request.module");
const projects_module_1 = require("./projects/projects.module");
const events_module_1 = require("./events/events.module");
const twilio_service_1 = require("./twilio/twilio.service");
const notification_module_1 = require("./notification/notification.module");
const mailer_1 = require("@nestjs-modules/mailer");
const email_service_1 = require("./email/email.service");
const notification_service_1 = require("./notification/notification.service");
const mailgun_service_1 = require("./mailgun/mailgun.service");
const platform_express_1 = require("@nestjs/platform-express");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            residents_module_1.ResidentsModule,
            officials_module_1.OfficialsModule,
            request_module_1.RequestModule,
            projects_module_1.ProjectsModule,
            events_module_1.EventsModule,
            notification_module_1.NotificationModule,
            config_1.ConfigModule.forRoot(),
            schedule_1.ScheduleModule.forRoot(),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            platform_express_1.MulterModule.register({ dest: './uploads' }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.EMAIL_USERNAME,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                },
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            prisma_service_1.PrismaService,
            twilio_service_1.TwilioService,
            email_service_1.EmailService,
            notification_service_1.NotificationService,
            mailgun_service_1.MailgunService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map