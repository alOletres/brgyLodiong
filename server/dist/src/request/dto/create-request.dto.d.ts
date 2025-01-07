import { REQUEST_MODE, REQUEST_STATUS, REQUEST_TYPE } from '@prisma/client';
export declare class CreateRequestDto {
    residentId: number;
    requestType: REQUEST_TYPE;
    status: REQUEST_STATUS;
    purpose: string;
    requestMode: REQUEST_MODE;
}
