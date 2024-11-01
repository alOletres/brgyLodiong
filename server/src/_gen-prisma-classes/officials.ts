import { Projects } from './projects';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Officials {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  firstname: string;

  @ApiProperty({ type: String })
  lastname: string;

  @ApiProperty({ type: String })
  position: string;

  @ApiProperty({ type: Date })
  startTerm: Date;

  @ApiPropertyOptional({ type: Date })
  endTerm?: Date;

  @ApiPropertyOptional({ type: String })
  achievements?: string;

  @ApiProperty({ isArray: true, type: () => Projects })
  Projects: Projects[];

  @ApiPropertyOptional({ type: Number })
  projectsId?: number;
}
