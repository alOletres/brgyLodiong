import { Projects } from './projects';
export declare class Officials {
    id: number;
    firstname: string;
    lastname: string;
    position: string;
    startTerm: Date;
    endTerm?: Date;
    achievements?: string;
    Projects: Projects[];
    projectsId?: number;
}
