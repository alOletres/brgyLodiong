import { OmitType } from '@nestjs/swagger';
import { Events as EventsEntity } from './../../_gen-prisma-classes/events';

export class FindAllEventsDto extends OmitType(EventsEntity, [
  'EventNotifications',
]) {}
