import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Projects as ProjectsEntity } from './../../_gen-prisma-classes/projects';

export class FindAllProjectsDto extends OmitType(ProjectsEntity, ['official']) {
  @ApiProperty({ type: String })
  officialName: string;
}
