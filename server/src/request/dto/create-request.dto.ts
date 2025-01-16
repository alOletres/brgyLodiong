import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { REQUEST_MODE, REQUEST_STATUS } from '@prisma/client';

export class CreateRequestDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  residentId: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  requestType: string;

  @ApiProperty({ enum: REQUEST_STATUS, enumName: 'REQUEST_STATUS' })
  @IsOptional()
  @IsString()
  status: REQUEST_STATUS = REQUEST_STATUS.PENDING;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  purpose: string;

  @ApiProperty({ enum: REQUEST_MODE, enumName: 'REQUEST_MODE' })
  @IsOptional()
  @IsString()
  requestMode: REQUEST_MODE = REQUEST_MODE.ONLINE;
}
