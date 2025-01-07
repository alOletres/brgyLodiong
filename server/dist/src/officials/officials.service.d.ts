import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOfficialsDto } from './dto/create-official.dto';
export declare class OfficialsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create({ endTerm, ...payload }: CreateOfficialsDto): Promise<void>;
    update(id: number, payload: CreateOfficialsDto): Promise<void>;
    fetch(): Promise<{
        id: number;
        firstname: string;
        lastname: string;
        position: string;
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
