import { ResidentsService } from './residents.service';
import { CreateResidentsDto } from './dto/create-residents.dto';
import { FindAllResidentsDto } from './dto/find-all.residents.dto';
import { RESIDENT_STATUS } from '@prisma/client';
export declare class ResidentsController {
    private residentService;
    constructor(residentService: ResidentsService);
    create(payload: CreateResidentsDto): Promise<void>;
    update(id: number, payload: CreateResidentsDto): Promise<void>;
    fetch(): Promise<FindAllResidentsDto[]>;
    fetchByStatus(status: RESIDENT_STATUS): Promise<FindAllResidentsDto[]>;
}
