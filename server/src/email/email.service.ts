import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail({ to, text }: { to: string; text: string }) {
    try {
      const info = await this.mailService.sendMail({
        from: process.env.EMAIL_USERNAME,
        to,
        subject: 'Brgy. Lower Lodiong Notification',
        text,
      });

      console.log('email response', info);
    } catch (err) {
      console.log('email error', err);
    }
  }
}
