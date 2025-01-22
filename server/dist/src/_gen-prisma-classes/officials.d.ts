import { Projects } from './projects';
export declare class Officials {
    id: number;
    firstname: string;
    lastname: string;
    suffix?: string;
    position: string;
    committee?: string;
    startTerm: Date;
    endTerm?: Date;
    achievements?: string;
    Projects: Projects[];
    projectsId?: number;
}
