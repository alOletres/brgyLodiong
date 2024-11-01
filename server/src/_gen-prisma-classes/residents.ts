import { Auth } from './auth';
import { Requests } from './requests';
import { Notifications } from './notifications';
import { EventNotifications } from './event_notifications';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Residents {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  firstname: string;

  @ApiProperty({ type: String })
  lastname: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  contact: string;

  @ApiProperty({ type: String })
  address: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiPropertyOptional({ type: () => Auth })
  Auth?: Auth;

  @ApiProperty({ isArray: true, type: () => Requests })
  Requests: Requests[];

  @ApiPropertyOptional({ type: Number })
  requestsId?: number;

  @ApiProperty({ isArray: true, type: () => Notifications })
  Notifications: Notifications[];

  @ApiProperty({ isArray: true, type: () => EventNotifications })
  EventNotifications: EventNotifications[];
}
