import { EventsService } from './events.service';
import { CreateEventsDto } from './dto/create-events.dto';
import { FindAllEventsDto } from './dto/findall-events.dto';
export declare class EventsController {
    private eventsService;
    constructor(eventsService: EventsService);
    create(payload: CreateEventsDto): Promise<void>;
    update(id: number, payload: CreateEventsDto): Promise<void>;
    fetch(): Promise<FindAllEventsDto[]>;
}
