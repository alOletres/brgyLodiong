import { Residents as ResidentEntity } from './../../_gen-prisma-classes/residents';
import { Auth as AuthEntity } from './../../_gen-prisma-classes/auth';
export declare class CreateResidentsDto {
    firstname: ResidentEntity['firstname'];
    lastname: ResidentEntity['lastname'];
    email: ResidentEntity['email'];
    contact: ResidentEntity['contact'];
    address: ResidentEntity['address'];
    role: AuthEntity['role'];
    password: AuthEntity['password'];
}
