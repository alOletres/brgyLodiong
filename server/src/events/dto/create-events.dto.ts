import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventsDto {
  @ApiProperty({ type: String })
  eventImage: string;

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
}
