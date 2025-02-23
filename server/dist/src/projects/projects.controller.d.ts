/// <reference types="multer" />
import { ProjectsService } from './projects.service';
import { CreateProjectsDto } from './dto/create-projects.dto';
import { FindAllProjectsDto } from './dto/find-all-projects.dto';
export declare class ProjectsController {
    private projectsService;
    constructor(projectsService: ProjectsService);
    create(payload: CreateProjectsDto): Promise<void>;
    update(id: number, payload: CreateProjectsDto): Promise<void>;
    uploadFiles(id: number, files: Express.Multer.File[]): Promise<void>;
    fetch(): Promise<FindAllProjectsDto[]>;
}
