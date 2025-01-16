import { REQUEST_STATUS } from '@prisma/client';
export declare class TwilioService {
    private readonly twilioClient;
    private readonly config;
    constructor();
    sendSms(to: string, body: string): Promise<void>;
    notifyResident(residentName: string, requestType: string, status: REQUEST_STATUS): string;
}
