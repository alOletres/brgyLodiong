import { Projects as ProjectsEntity } from './../../_gen-prisma-classes/projects';
declare const FindAllProjectsDto_base: import("@nestjs/common").Type<Omit<ProjectsEntity, "official">>;
export declare class FindAllProjectsDto extends FindAllProjectsDto_base {
    officialName: string;
}
export {};
