import { ApiProperty, PickType } from '@nestjs/swagger';
import { Requests as RequestEntity } from './../../_gen-prisma-classes/requests';
import { Residents } from 'src/_gen-prisma-classes/residents';

export class FindAllRequestsDto extends PickType(RequestEntity, [
  'id',
  'requestType',
  'status',
  'purpose',
  'dateRequested',
  'dateCompleted',
  'requestMode',
]) {
  @ApiProperty({ type: () => Residents })
  resident: Pick<
    Residents,
    'firstname' | 'lastname' | 'contact' | 'email' | 'address'
  >;
}
