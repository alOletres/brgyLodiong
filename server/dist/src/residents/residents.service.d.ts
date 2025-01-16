import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResidentsDto } from './dto/create-residents.dto';
import { FindAllResidentsDto } from './dto/find-all.residents.dto';
export declare class ResidentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create({ password, role, ...payload }: CreateResidentsDto): Promise<void>;
    update(id: number, { password, role, ...payload }: CreateResidentsDto): Promise<void>;
    fetch(): Promise<FindAllResidentsDto[]>;
    findOne(id: number): Promise<{
        id: number;
        civilStatus: import(".prisma/client").$Enums.CIVIL_STATUS;
        contact: string;
        email: string;
        address: string;
        firstname: string;
        lastname: string;
        createdAt: Date;
        requestsId: number;
    }>;
}
