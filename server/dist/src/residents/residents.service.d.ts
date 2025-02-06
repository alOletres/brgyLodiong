import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResidentsDto } from './dto/create-residents.dto';
import { FindAllResidentsDto } from './dto/find-all.residents.dto';
import { RESIDENT_STATUS } from '@prisma/client';
import { TwilioService } from 'src/twilio/twilio.service';
import { EmailService } from 'src/email/email.service';
import { NotificationService } from 'src/notification/notification.service';
export declare class ResidentsService {
    private readonly prisma;
    private readonly twilioService;
    private readonly emailService;
    private readonly notificationService;
    constructor(prisma: PrismaService, twilioService: TwilioService, emailService: EmailService, notificationService: NotificationService);
    private selectedResidents;
    create({ password, role, ...payload }: CreateResidentsDto): Promise<void>;
    update(id: number, { password, role, ...payload }: CreateResidentsDto): Promise<void>;
    fetch(): Promise<FindAllResidentsDto[]>;
    findOne(id: number): Promise<{
        email: string;
        id: number;
        status: import(".prisma/client").$Enums.RESIDENT_STATUS;
        requestsId: number;
        firstname: string;
        civilStatus: import(".prisma/client").$Enums.CIVIL_STATUS;
        lastname: string;
        contact: string;
        address: string;
        createdAt: Date;
        disApprovedReason: string;
    }>;
    fetchByStatus(status: RESIDENT_STATUS): Promise<FindAllResidentsDto[]>;
}
