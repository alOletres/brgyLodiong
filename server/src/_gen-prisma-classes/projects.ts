import { Officials } from './officials';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Projects {
  @ApiProperty({ type: Number })
  id: number;

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

  @ApiProperty({ isArray: true, type: () => Officials })
  official: Officials[];
}
