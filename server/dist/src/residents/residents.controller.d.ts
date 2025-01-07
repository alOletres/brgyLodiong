import { ResidentsService } from './residents.service';
import { CreateResidentsDto } from './dto/create-residents.dto';
import { FindAllResidentsDto } from './dto/find-all.residents.dto';
export declare class ResidentsController {
    private residentService;
    constructor(residentService: ResidentsService);
    create(payload: CreateResidentsDto): Promise<void>;
    update(id: number, payload: CreateResidentsDto): Promise<void>;
    fetch(): Promise<FindAllResidentsDto[]>;
}
