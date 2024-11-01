import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { REQUEST_MODE, REQUEST_STATUS, REQUEST_TYPE } from '@prisma/client';

export class CreateRequestDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  residentId: number;

  @ApiProperty({ enum: REQUEST_TYPE, enumName: 'REQUEST_TYPE' })
  @IsNotEmpty()
  @IsString()
  requestType: REQUEST_TYPE;

  @ApiProperty({ enum: REQUEST_STATUS, enumName: 'REQUEST_STATUS' })
  @IsNotEmpty()
  @IsString()
  status: REQUEST_STATUS;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  purpose: string;

  @ApiProperty({ enum: REQUEST_MODE, enumName: 'REQUEST_MODE' })
  @IsNotEmpty()
  @IsString()
  requestMode: REQUEST_MODE = REQUEST_MODE.ONLINE;
}
