import { Residents } from './residents';
import { USER_ROLE, ACCOUNT_STATUS } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Auth {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  residentId: number;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ enum: USER_ROLE, enumName: 'USER_ROLE' })
  role: USER_ROLE = USER_ROLE.RESIDENT;

  @ApiProperty({ enum: ACCOUNT_STATUS, enumName: 'ACCOUNT_STATUS' })
  status: ACCOUNT_STATUS = ACCOUNT_STATUS.ACTIVE;

  @ApiProperty({ type: Date })
  lastLoggedIn: Date;

  @ApiProperty({ type: () => Residents })
  resident: Residents;
}
