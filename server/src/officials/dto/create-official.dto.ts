import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Projects } from 'src/_gen-prisma-classes/projects';
export class CreateOfficialsDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  @IsDate()
  startTerm: Date;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  endTerm?: Date;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  achievements?: string;

  @ApiPropertyOptional({ type: () => Projects })
  Projects?: Projects;

  @ApiPropertyOptional({ type: Number })
  projectsId?: number;
}
