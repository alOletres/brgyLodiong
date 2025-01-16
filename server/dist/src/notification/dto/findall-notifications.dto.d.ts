import { NOTIFICATION_TYPE, REQUEST_MODE } from '@prisma/client';
export declare class FindAllNotificationsDto {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    contact: string;
    notificationType: NOTIFICATION_TYPE;
    message: string;
    sentAt: Date;
    requestMode: REQUEST_MODE;
    purpose: string;
    requestType: string;
    residentId: number;
}
