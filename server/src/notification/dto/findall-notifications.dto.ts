import { ApiProperty } from '@nestjs/swagger';
import { NOTIFICATION_TYPE, REQUEST_MODE } from '@prisma/client';

export class FindAllNotificationsDto {
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

  @ApiProperty({ enum: NOTIFICATION_TYPE, enumName: 'NOTIFICATION_TYPE' })
  notificationType: NOTIFICATION_TYPE;

  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: Date })
  sentAt: Date;

  @ApiProperty({ enum: REQUEST_MODE, enumName: 'REQUEST_MODE' })
  requestMode: REQUEST_MODE = REQUEST_MODE.ONLINE;

  @ApiProperty({ type: String })
  purpose: string;

  @ApiProperty({ type: String })
  requestType: string;

  @ApiProperty({ type: Number })
  residentId: number;
}
