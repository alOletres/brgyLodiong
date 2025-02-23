import { EVENT_STATUS } from '@prisma/client';
export declare class CreateEventsDto {
    eventName: string;
    description: string;
    eventDate: Date;
    location: string;
    status: EVENT_STATUS;
}
