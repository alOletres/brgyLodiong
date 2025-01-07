import { Residents } from './residents';
import { Events } from './events';
import { NOTIFICATION_TYPE, NOTIFICATION_STATUS } from '@prisma/client';
export declare class EventNotifications {
    id: number;
    residentId: number;
    eventId: number;
    notificationType: NOTIFICATION_TYPE;
    status: NOTIFICATION_STATUS;
    sentAt: Date;
    residents: Residents[];
    events: Events[];
}
