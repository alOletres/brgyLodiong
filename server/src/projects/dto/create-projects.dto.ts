import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjectsDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  projectName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  officialId: number;
}
