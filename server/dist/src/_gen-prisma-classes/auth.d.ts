import { Residents } from './residents';
import { USER_ROLE, ACCOUNT_STATUS } from '@prisma/client';
export declare class Auth {
    id: number;
    residentId: number;
    email: string;
    password: string;
    role: USER_ROLE;
    status: ACCOUNT_STATUS;
    lastLoggedIn: Date;
    resident: Residents;
}
