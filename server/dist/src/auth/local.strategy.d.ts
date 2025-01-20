import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.ACCOUNT_STATUS;
        resident: {
            id: number;
            status: import(".prisma/client").$Enums.RESIDENT_STATUS;
            firstname: string;
            lastname: string;
            contact: string;
            address: string;
        };
        email: string;
        role: import(".prisma/client").$Enums.USER_ROLE;
        lastLoggedIn: Date;
    }>;
}
export {};
