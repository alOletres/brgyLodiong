import { Residents } from './residents';
import { Notifications } from './notifications';
import { REQUEST_TYPE, REQUEST_STATUS, REQUEST_MODE } from '@prisma/client';
export declare class Requests {
    id: number;
    residentId: number;
    requestType: REQUEST_TYPE;
    status: REQUEST_STATUS;
    purpose: string;
    dateRequested: Date;
    dateCompleted?: Date;
    resident: Residents;
    requestMode: REQUEST_MODE;
    Notifications: Notifications[];
}
