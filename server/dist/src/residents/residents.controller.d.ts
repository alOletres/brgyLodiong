/// <reference types="multer" />
import { ResidentsService } from './residents.service';
import { CreateResidentsDto } from './dto/create-residents.dto';
import { FindAllResidentsDto } from './dto/find-all.residents.dto';
import { RESIDENT_STATUS } from '@prisma/client';
export declare class ResidentsController {
    private residentService;
    constructor(residentService: ResidentsService);
    create(payload: CreateResidentsDto, image: Express.Multer.File): Promise<void>;
    update(id: number, payload: CreateResidentsDto, image: Express.Multer.File): Promise<void>;
    fetch(): Promise<FindAllResidentsDto[]>;
    fetchByStatus(status: RESIDENT_STATUS): Promise<FindAllResidentsDto[]>;
    updateResidentStatus(id: number, status: RESIDENT_STATUS): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.RESIDENT_STATUS;
        createdAt: Date;
        image: string;
        firstname: string;
        civilStatus: import(".prisma/client").$Enums.CIVIL_STATUS;
        lastname: string;
        email: string;
        contact: string;
        address: string;
        disApprovedReason: string;
        requestsId: number;
    }>;
}
