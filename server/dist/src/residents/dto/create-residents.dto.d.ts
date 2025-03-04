import { Residents as ResidentEntity } from './../../_gen-prisma-classes/residents';
import { Auth as AuthEntity } from './../../_gen-prisma-classes/auth';
import { CIVIL_STATUS, RESIDENT_STATUS } from '@prisma/client';
export declare class CreateResidentsDto {
    image?: string;
    civilStatus: CIVIL_STATUS;
    firstname: ResidentEntity['firstname'];
    lastname: ResidentEntity['lastname'];
    email: ResidentEntity['email'];
    contact: ResidentEntity['contact'];
    address: ResidentEntity['address'];
    role: AuthEntity['role'];
    password: AuthEntity['password'];
    status: RESIDENT_STATUS;
    disApprovedReason?: string;
}
