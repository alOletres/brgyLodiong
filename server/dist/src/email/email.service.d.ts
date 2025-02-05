import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private readonly mailService;
    constructor(mailService: MailerService);
    sendMail(payload: {
        to: string;
        text: string;
    }): Promise<void>;
}
