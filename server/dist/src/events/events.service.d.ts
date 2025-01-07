import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventsDto } from './dto/create-events.dto';
import { FindAllEventsDto } from './dto/findall-events.dto';
export declare class EventsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(payload: CreateEventsDto): Promise<void>;
    update(id: number, payload: CreateEventsDto): Promise<void>;
    fetch(): Promise<FindAllEventsDto[]>;
}
