import { Residents as ResidentsEntity } from '../../_gen-prisma-classes/residents';
import { Auth as AuthEntity } from '../../_gen-prisma-classes/auth';
declare const FindAllResidentsDto_base: import("@nestjs/common").Type<Omit<ResidentsEntity, "Notifications" | "createdAt" | "EventNotifications" | "Auth" | "Requests" | "requestsId"> & Pick<AuthEntity, "status" | "role">>;
export declare class FindAllResidentsDto extends FindAllResidentsDto_base {
}
export {};
