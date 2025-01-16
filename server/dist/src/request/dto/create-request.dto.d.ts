import { REQUEST_MODE, REQUEST_STATUS } from '@prisma/client';
export declare class CreateRequestDto {
    residentId: number;
    requestType: string;
    status: REQUEST_STATUS;
    rejectionReason?: string;
    purpose: string;
    requestMode: REQUEST_MODE;
}
