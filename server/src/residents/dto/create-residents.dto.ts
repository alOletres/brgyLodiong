import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Residents as ResidentEntity } from './../../_gen-prisma-classes/residents';
import { ApiProperty } from '@nestjs/swagger';
import { Auth as AuthEntity } from './../../_gen-prisma-classes/auth';
import { USER_ROLE } from '@prisma/client';

export class CreateResidentsDto {
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
}
