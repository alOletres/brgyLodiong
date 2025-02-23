import { Officials } from './officials';
import { PROJECT_STATUS } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Projects {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  members: string;

  @ApiProperty({ type: String })
  projectName: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Date })
  startDate: Date;

  @ApiPropertyOptional({ type: Date })
  endDate?: Date;

  @ApiProperty({ type: Number })
  officialId: number;

  @ApiPropertyOptional({ type: () => Officials })
  official?: Officials;

  @ApiProperty({ enum: PROJECT_STATUS, enumName: 'PROJECT_STATUS' })
  status: PROJECT_STATUS = PROJECT_STATUS.PENDING;

  @ApiPropertyOptional({ type: String })
  documents?: string;
}
