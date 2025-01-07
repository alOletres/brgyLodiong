import { Requests as RequestEntity } from './../../_gen-prisma-classes/requests';
declare const FindAllRequestsDto_base: import("@nestjs/common").Type<Pick<RequestEntity, "id" | "residentId" | "status" | "requestType" | "purpose" | "dateRequested" | "dateCompleted" | "requestMode">>;
export declare class FindAllRequestsDto extends FindAllRequestsDto_base {
    contact: string;
    email: string;
    address: string;
    requestedBy: string;
}
export {};
