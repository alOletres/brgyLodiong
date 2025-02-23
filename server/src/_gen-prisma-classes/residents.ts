import { Auth } from './auth';
import { Requests } from './requests';
import { Notifications } from './notifications';
import { EventNotifications } from './event_notifications';
import { CIVIL_STATUS, RESIDENT_STATUS } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Residents {
  @ApiProperty({ type: Number })
  id: number;

  @ApiPropertyOptional({ type: String })
  image?: string;

  @ApiProperty({ type: String })
  firstname: string;

  @ApiProperty({ enum: CIVIL_STATUS, enumName: 'CIVIL_STATUS' })
  civilStatus: CIVIL_STATUS = CIVIL_STATUS.SINGLE;

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

  @ApiProperty({ enum: RESIDENT_STATUS, enumName: 'RESIDENT_STATUS' })
  status: RESIDENT_STATUS = RESIDENT_STATUS.PENDING;

  @ApiPropertyOptional({ type: String })
  disApprovedReason?: string;

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
