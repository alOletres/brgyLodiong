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
        createdAt: Date;
        firstname: string;
        lastname: string;
        email: string;
        contact: string;
        address: string;
        requestsId: number;
    }>;
}
