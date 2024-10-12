import { Residents } from './residents';
import { Notifications } from './notifications';
import { REQUEST_TYPE, REQUEST_STATUS } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Requests {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  residentId: number;

  @ApiProperty({ enum: REQUEST_TYPE, enumName: 'REQUEST_TYPE' })
  requestType: REQUEST_TYPE;

  @ApiProperty({ enum: REQUEST_STATUS, enumName: 'REQUEST_STATUS' })
  status: REQUEST_STATUS;

  @ApiProperty({ type: Date })
  dateRequested: Date;

  @ApiPropertyOptional({ type: Date })
  dateCompleted?: Date;

  @ApiProperty({ isArray: true, type: () => Residents })
  resident: Residents[];

  @ApiProperty({ isArray: true, type: () => Notifications })
  Notifications: Notifications[];
}
