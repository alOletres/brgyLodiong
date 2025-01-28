import { MailgunMessageData } from 'mailgun.js';
export declare class MailgunService {
    private client;
    sendMail(data: MailgunMessageData): Promise<void>;
}
