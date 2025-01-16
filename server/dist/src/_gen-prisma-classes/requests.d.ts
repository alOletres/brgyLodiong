import { Residents } from './residents';
import { Notifications } from './notifications';
import { REQUEST_STATUS, REQUEST_MODE } from '@prisma/client';
export declare class Requests {
    id: number;
    residentId: number;
    requestType: string;
    status: REQUEST_STATUS;
    rejectionReason?: string;
    purpose: string;
    dateRequested: Date;
    dateCompleted?: Date;
    resident: Residents;
    requestMode: REQUEST_MODE;
    Notifications: Notifications[];
}
