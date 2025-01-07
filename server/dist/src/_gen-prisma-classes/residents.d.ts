import { Auth } from './auth';
import { Requests } from './requests';
import { Notifications } from './notifications';
import { EventNotifications } from './event_notifications';
export declare class Residents {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    contact: string;
    address: string;
    createdAt: Date;
    Auth?: Auth;
    Requests: Requests[];
    requestsId?: number;
    Notifications: Notifications[];
    EventNotifications: EventNotifications[];
}
