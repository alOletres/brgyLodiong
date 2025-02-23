import { ApiProperty } from '@nestjs/swagger';
import { EVENT_STATUS } from '@prisma/client';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventsDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  eventName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  @IsDate()
  eventDate: Date;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ enum: EVENT_STATUS, enumName: 'EVENT_STATUS' })
  @IsNotEmpty()
  @IsString()
  status: EVENT_STATUS = EVENT_STATUS.ONGOING;
}
