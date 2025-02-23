import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventsDto } from './dto/create-events.dto';
import { FindAllEventsDto } from './dto/findall-events.dto';
import { TwilioService } from 'src/twilio/twilio.service';
import { ResidentsService } from 'src/residents/residents.service';
import { MailgunService } from 'src/mailgun/mailgun.service';
export declare class EventsService {
    private readonly prisma;
    private readonly twilioService;
    private readonly mailgunService;
    private readonly residentService;
    constructor(prisma: PrismaService, twilioService: TwilioService, mailgunService: MailgunService, residentService: ResidentsService);
    notificationBlasting(payload: CreateEventsDto): Promise<void>;
    create(payload: CreateEventsDto): Promise<void>;
    update(id: number, payload: CreateEventsDto): Promise<void>;
    fetch(): Promise<FindAllEventsDto[]>;
}
