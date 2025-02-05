import { Projects } from 'src/_gen-prisma-classes/projects';
export declare class CreateOfficialsDto {
    firstname: string;
    lastname: string;
    position: string;
    startTerm: Date;
    endTerm?: Date;
    achievements?: string;
    suffix?: string;
    committee?: string;
    Projects?: Projects;
    projectsId?: number;
}
