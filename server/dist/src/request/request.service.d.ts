import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { FindAllRequestsDto } from './dto/find-all-requests.dto';
import { TwilioService } from 'src/twilio/twilio.service';
import { ResidentsService } from 'src/residents/residents.service';
import { NotificationService } from 'src/notification/notification.service';
export declare class RequestService {
    private readonly prisma;
    private twilioService;
    private residentService;
    private notificationService;
    private selectRequestProperties;
    constructor(prisma: PrismaService, twilioService: TwilioService, residentService: ResidentsService, notificationService: NotificationService);
    create(payload: CreateRequestDto): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.REQUEST_STATUS;
        residentId: number;
        requestType: string;
        purpose: string;
        dateRequested: Date;
        dateCompleted: Date;
        requestMode: import(".prisma/client").$Enums.REQUEST_MODE;
    }>;
    update(id: number, payload: CreateRequestDto): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.REQUEST_STATUS;
        residentId: number;
        requestType: string;
        purpose: string;
        dateRequested: Date;
        dateCompleted: Date;
        requestMode: import(".prisma/client").$Enums.REQUEST_MODE;
    }>;
    fetch(): Promise<FindAllRequestsDto[]>;
    findByResident(id: number): Promise<FindAllRequestsDto[]>;
}
