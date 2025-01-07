import { Events as EventsEntity } from './../../_gen-prisma-classes/events';
declare const FindAllEventsDto_base: import("@nestjs/common").Type<Omit<EventsEntity, "EventNotifications">>;
export declare class FindAllEventsDto extends FindAllEventsDto_base {
}
export {};
