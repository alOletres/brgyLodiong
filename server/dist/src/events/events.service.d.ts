import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventsDto } from './dto/create-events.dto';
import { FindAllEventsDto } from './dto/findall-events.dto';
import { TwilioService } from 'src/twilio/twilio.service';
import { EmailService } from 'src/email/email.service';
import { ResidentsService } from 'src/residents/residents.service';
export declare class EventsService {
    private readonly prisma;
    private readonly twilioService;
    private readonly emailService;
    private readonly residentService;
    constructor(prisma: PrismaService, twilioService: TwilioService, emailService: EmailService, residentService: ResidentsService);
    notificationBlasting(payload: CreateEventsDto): Promise<void>;
    create(payload: CreateEventsDto): Promise<void>;
    update(id: number, payload: CreateEventsDto): Promise<void>;
    fetch(): Promise<FindAllEventsDto[]>;
}
