import { ApiProperty, PickType } from '@nestjs/swagger';
import { Requests as RequestEntity } from './../../_gen-prisma-classes/requests';

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
  @ApiProperty({ type: String })
  contact: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  address: string;

  @ApiProperty({ type: String })
  requestedBy: string;
}
