import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail({ to, message }: { to: string; message: string }) {
    try {
      const info = await this.mailService.sendMail({
        from: process.env.EMAIL_USERNAME,
        to,
        subject: 'Brgy. Lower Lodiong Notification',
        text: message,
      });

      console.log('email infomation', info);
    } catch (err) {
      console.log('email error', err);
    }
  }
}
