import { ApiProperty } from '@nestjs/swagger';
import { NOTIFICATION_STATUS, NOTIFICATION_TYPE } from '@prisma/client';

export class CreateNotificationDto {
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
}
