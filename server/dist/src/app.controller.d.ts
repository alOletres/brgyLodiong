import { AuthService } from './auth/auth.service';
import { Response } from 'express';
import { ChangePasswordDto } from './auth/dto/change-password.dto';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(req: any, res: Response): Promise<void>;
    changePassword(email: string, payload: ChangePasswordDto): Promise<void>;
}
