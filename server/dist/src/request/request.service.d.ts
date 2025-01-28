import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { FindAllRequestsDto } from './dto/find-all-requests.dto';
import { TwilioService } from 'src/twilio/twilio.service';
import { ResidentsService } from 'src/residents/residents.service';
import { NotificationService } from 'src/notification/notification.service';
import { EmailService } from 'src/email/email.service';
import { MailgunService } from 'src/mailgun/mailgun.service';
export declare class RequestService {
    private readonly prisma;
    private twilioService;
    private residentService;
    private notificationService;
    private emailService;
    private mailGunService;
    private selectRequestProperties;
    constructor(prisma: PrismaService, twilioService: TwilioService, residentService: ResidentsService, notificationService: NotificationService, emailService: EmailService, mailGunService: MailgunService);
    create(payload: CreateRequestDto): Promise<{
        id: number;
        residentId: number;
        requestType: string;
        status: import(".prisma/client").$Enums.REQUEST_STATUS;
        rejectionReason: string;
        purpose: string;
        dateRequested: Date;
        dateCompleted: Date;
        dateClaimed: Date;
        requestMode: import(".prisma/client").$Enums.REQUEST_MODE;
    }>;
    update(id: number, payload: CreateRequestDto): Promise<{
        id: number;
        residentId: number;
        requestType: string;
        status: import(".prisma/client").$Enums.REQUEST_STATUS;
        rejectionReason: string;
        purpose: string;
        dateRequested: Date;
        dateCompleted: Date;
        dateClaimed: Date;
        requestMode: import(".prisma/client").$Enums.REQUEST_MODE;
    }>;
    fetch(): Promise<FindAllRequestsDto[]>;
    findByResident(id: number): Promise<FindAllRequestsDto[]>;
}
