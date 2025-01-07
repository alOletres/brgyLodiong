import { REQUEST_STATUS, REQUEST_TYPE } from '@prisma/client';
export declare class TwilioService {
    private readonly twilioClient;
    private readonly config;
    constructor();
    sendSms(to: string, body: string): Promise<void>;
    notifyResident(residentName: string, requestType: REQUEST_TYPE, status: REQUEST_STATUS): string;
}
