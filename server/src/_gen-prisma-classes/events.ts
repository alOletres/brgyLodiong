import { EventNotifications } from './event_notifications';
import { ApiProperty } from '@nestjs/swagger';

export class Events {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  eventName: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Date })
  eventDate: Date;

  @ApiProperty({ type: String })
  location: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ isArray: true, type: () => EventNotifications })
  EventNotifications: EventNotifications[];
}
