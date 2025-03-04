import { Requests as RequestEntity } from './../../_gen-prisma-classes/requests';
import { CIVIL_STATUS } from '@prisma/client';
declare const FindAllRequestsDto_base: import("@nestjs/common").Type<Pick<RequestEntity, "id" | "residentId" | "status" | "requestType" | "rejectionReason" | "purpose" | "dateRequested" | "dateCompleted" | "dateClaimed" | "requestMode">>;
export declare class FindAllRequestsDto extends FindAllRequestsDto_base {
    requestedId: number;
    civilStatus: CIVIL_STATUS;
    contact: string;
    email: string;
    address: string;
    requestedBy: string;
}
export {};
