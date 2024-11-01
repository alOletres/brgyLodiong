import { Residents } from './residents';
import { Notifications } from './notifications';
import { REQUEST_TYPE, REQUEST_STATUS, REQUEST_MODE } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Requests {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  residentId: number;

  @ApiProperty({ enum: REQUEST_TYPE, enumName: 'REQUEST_TYPE' })
  requestType: REQUEST_TYPE;

  @ApiProperty({ enum: REQUEST_STATUS, enumName: 'REQUEST_STATUS' })
  status: REQUEST_STATUS = REQUEST_STATUS.PENDING;

  @ApiProperty({ type: String })
  purpose: string;

  @ApiProperty({ type: Date })
  dateRequested: Date;

  @ApiPropertyOptional({ type: Date })
  dateCompleted?: Date;

  @ApiProperty({ type: () => Residents })
  resident: Residents;

  @ApiProperty({ enum: REQUEST_MODE, enumName: 'REQUEST_MODE' })
  requestMode: REQUEST_MODE = REQUEST_MODE.ONLINE;

  @ApiProperty({ isArray: true, type: () => Notifications })
  Notifications: Notifications[];
}
