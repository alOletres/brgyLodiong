import { NOTIFICATION_STATUS, NOTIFICATION_TYPE } from '@prisma/client';
export declare class CreateNotificationDto {
    residentId: number;
    requestId: number;
    notificationType: NOTIFICATION_TYPE;
    message: string;
    status: NOTIFICATION_STATUS;
}
