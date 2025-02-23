import { EventNotifications } from './event_notifications';
import { EVENT_STATUS } from '@prisma/client';
export declare class Events {
    id: number;
    eventName: string;
    description: string;
    eventDate: Date;
    location: string;
    createdAt: Date;
    status: EVENT_STATUS;
    EventNotifications: EventNotifications[];
}
