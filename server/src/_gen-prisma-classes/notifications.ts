import { Residents } from './residents';
import { Requests } from './requests';
import { NOTIFICATION_TYPE, NOTIFICATION_STATUS } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Notifications {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  residentId: number;

  @ApiProperty({ type: Number })
  requestId: number;

  @ApiProperty({ enum: NOTIFICATION_TYPE, enumName: 'NOTIFICATION_TYPE' })
  notificationType: NOTIFICATION_TYPE;

  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ enum: NOTIFICATION_STATUS, enumName: 'NOTIFICATION_STATUS' })
  status: NOTIFICATION_STATUS;

  @ApiProperty({ type: Date })
  sentAt: Date;

  @ApiProperty({ isArray: true, type: () => Residents })
  residents: Residents[];

  @ApiProperty({ isArray: true, type: () => Requests })
  requests: Requests[];
}
