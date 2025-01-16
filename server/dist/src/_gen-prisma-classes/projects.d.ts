import { Officials } from './officials';
import { PROJECT_STATUS } from '@prisma/client';
export declare class Projects {
    id: number;
    members: string;
    projectName: string;
    description: string;
    startDate: Date;
    endDate?: Date;
    officialId: number;
    official?: Officials;
    status: PROJECT_STATUS;
}
