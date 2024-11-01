import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Projects as ProjectsEntity } from './../../_gen-prisma-classes/projects';

import { Officials } from 'src/_gen-prisma-classes/officials';

export class FindAllProjectsDto extends OmitType(ProjectsEntity, [
  'officialId',
  'official',
]) {
  @ApiPropertyOptional({ type: () => Officials })
  official?: Pick<
    Officials,
    | 'firstname'
    | 'lastname'
    | 'achievements'
    | 'position'
    | 'startTerm'
    | 'endTerm'
  >;
}
