import { Officials } from './officials';
export declare class Projects {
    id: number;
    projectName: string;
    description: string;
    startDate: Date;
    endDate?: Date;
    officialId: number;
    official?: Officials;
}
