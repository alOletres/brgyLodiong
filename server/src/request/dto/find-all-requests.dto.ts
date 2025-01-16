import { ApiProperty, PickType } from '@nestjs/swagger';
import { Requests as RequestEntity } from './../../_gen-prisma-classes/requests';
import { CIVIL_STATUS } from '@prisma/client';

export class FindAllRequestsDto extends PickType(RequestEntity, [
  'id',
  'requestType',
  'status',
  'purpose',
  'dateRequested',
  'dateCompleted',
  'requestMode',
  'residentId',
]) {
  @ApiProperty({ type: Number })
  requestedId: number;
  @ApiProperty({ enum: CIVIL_STATUS, enumName: 'CIVIL_STATUS' })
  civilStatus: CIVIL_STATUS = CIVIL_STATUS.SINGLE;

  @ApiProperty({ type: String })
  contact: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  address: string;

  @ApiProperty({ type: String })
  requestedBy: string;
}
