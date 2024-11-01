import { Residents as ResidentsEntity } from '../../_gen-prisma-classes/residents';

import { Auth as AuthEntity } from '../../_gen-prisma-classes/auth';
import { IntersectionType, OmitType, PickType } from '@nestjs/swagger';

export class FindAllResidentsDto extends IntersectionType(
  OmitType(ResidentsEntity, [
    'Auth',
    'EventNotifications',
    'Notifications',
    'requestsId',
    'Requests',
    'createdAt',
  ]),
  PickType(AuthEntity, ['role', 'status']),
) {}
