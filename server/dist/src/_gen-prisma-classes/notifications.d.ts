import { Residents } from './residents';
import { Requests } from './requests';
import { NOTIFICATION_TYPE, NOTIFICATION_STATUS } from '@prisma/client';
export declare class Notifications {
    id: number;
    residentId: number;
    requestId: number;
    notificationType: NOTIFICATION_TYPE;
    message: string;
    status: NOTIFICATION_STATUS;
    sentAt: Date;
    residents: Residents;
    requests: Requests;
}
