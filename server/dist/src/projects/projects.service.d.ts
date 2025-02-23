import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectsDto } from './dto/create-projects.dto';
import { FindAllProjectsDto } from './dto/find-all-projects.dto';
export declare class ProjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(payload: CreateProjectsDto): Promise<void>;
    update(id: number, payload: CreateProjectsDto): Promise<void>;
    uploadFiles(id: number, files: string[]): Promise<void>;
    fetch(): Promise<FindAllProjectsDto[]>;
}
