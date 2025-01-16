import { REQUEST_MODE, REQUEST_STATUS } from '@prisma/client';
export declare class CreateRequestDto {
    residentId: number;
    requestType: string;
    status: REQUEST_STATUS;
    purpose: string;
    requestMode: REQUEST_MODE;
}
