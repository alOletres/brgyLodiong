import { Auth } from 'src/_gen-prisma-classes/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResidentsDto } from 'src/residents/dto/create-residents.dto';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class AuthService {
    private readonly prismaService;
    private jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    validateUser({ email, password }: Pick<Auth, 'email' | 'password'>): Promise<{
        email: string;
        id: number;
        role: import(".prisma/client").$Enums.USER_ROLE;
        status: import(".prisma/client").$Enums.ACCOUNT_STATUS;
        lastLoggedIn: Date;
        resident: {
            id: number;
            status: import(".prisma/client").$Enums.RESIDENT_STATUS;
            firstname: string;
            lastname: string;
            contact: string;
            address: string;
        };
    }>;
    login(user: CreateResidentsDto): Promise<{
        access_token: string;
    }>;
    findOneUser(email: string): Promise<{
        email: string;
        password: string;
        id: number;
        role: import(".prisma/client").$Enums.USER_ROLE;
        status: import(".prisma/client").$Enums.ACCOUNT_STATUS;
        lastLoggedIn: Date;
        resident: {
            id: number;
            status: import(".prisma/client").$Enums.RESIDENT_STATUS;
            firstname: string;
            lastname: string;
            contact: string;
            address: string;
        };
    }>;
    changePassword(email: string, { currentPassword, newPassword }: ChangePasswordDto): Promise<void>;
}
