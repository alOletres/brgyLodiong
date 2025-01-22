import { OfficialsService } from './officials.service';
import { CreateOfficialsDto } from './dto/create-official.dto';
export declare class OfficialsController {
    private officialsService;
    constructor(officialsService: OfficialsService);
    create(payload: CreateOfficialsDto): Promise<void>;
    update(id: number, payload: CreateOfficialsDto): Promise<void>;
    fetch(): Promise<{
        id: number;
        firstname: string;
        lastname: string;
        suffix: string;
        position: string;
        committee: string;
        startTerm: Date;
        endTerm: Date;
        achievements: string;
        Projects: {
            description: string;
            projectName: string;
            startDate: Date;
            endDate: Date;
        }[];
    }[]>;
}
