import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResidentsDto } from './dto/create-residents.dto';
import { FindAllResidentsDto } from './dto/find-all.residents.dto';
import { RESIDENT_STATUS } from '@prisma/client';
import { TwilioService } from 'src/twilio/twilio.service';
import { EmailService } from 'src/email/email.service';
import { NotificationService } from 'src/notification/notification.service';
import { MailgunService } from 'src/mailgun/mailgun.service';
export declare class ResidentsService {
    private readonly prisma;
    private readonly twilioService;
    private readonly emailService;
    private readonly notificationService;
    private readonly mailGunService;
    constructor(prisma: PrismaService, twilioService: TwilioService, emailService: EmailService, notificationService: NotificationService, mailGunService: MailgunService);
    private selectedResidents;
    create({ password, role, ...payload }: CreateResidentsDto): Promise<void>;
    update(id: number, { password, role, ...payload }: CreateResidentsDto): Promise<void>;
    fetch(): Promise<FindAllResidentsDto[]>;
    findOne(id: number): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.RESIDENT_STATUS;
        createdAt: Date;
        firstname: string;
        civilStatus: import(".prisma/client").$Enums.CIVIL_STATUS;
        lastname: string;
        email: string;
        contact: string;
        address: string;
        disApprovedReason: string;
        requestsId: number;
    }>;
    fetchByStatus(status: RESIDENT_STATUS): Promise<FindAllResidentsDto[]>;
}
