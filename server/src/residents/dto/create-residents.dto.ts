import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Residents as ResidentEntity } from './../../_gen-prisma-classes/residents';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Auth as AuthEntity } from './../../_gen-prisma-classes/auth';
import { CIVIL_STATUS, RESIDENT_STATUS, USER_ROLE } from '@prisma/client';

export class CreateResidentsDto {
  @ApiProperty({ enum: CIVIL_STATUS, enumName: 'CIVIL_STATUS' })
  @IsNotEmpty()
  @IsString()
  civilStatus: CIVIL_STATUS = CIVIL_STATUS.SINGLE;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  firstname: ResidentEntity['firstname'];

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  lastname: ResidentEntity['lastname'];

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  email: ResidentEntity['email'];

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  contact: ResidentEntity['contact'];

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  address: ResidentEntity['address'];

  @ApiProperty({ enum: USER_ROLE })
  @IsOptional()
  @IsString()
  role: AuthEntity['role'];

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  password: AuthEntity['password'];

  @ApiProperty({ enum: RESIDENT_STATUS, enumName: 'RESIDENT_STATUS' })
  @IsOptional()
  @IsString()
  status: RESIDENT_STATUS = RESIDENT_STATUS.DISAPPROVED;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  disApprovedReason?: string;
}
