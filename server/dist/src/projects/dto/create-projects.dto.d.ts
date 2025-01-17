import { PROJECT_STATUS } from '@prisma/client';
export declare class CreateProjectsDto {
    projectName: string;
    members: string;
    description: string;
    startDate: Date;
    endDate?: Date;
    officialId: number;
    status: PROJECT_STATUS;
}
