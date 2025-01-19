import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private readonly mailService;
    constructor(mailService: MailerService);
    sendMail({ to, message }: {
        to: string;
        message: string;
    }): Promise<void>;
}
