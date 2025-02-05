import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import axios from 'axios';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(payload: { to: string; text: string }) {
    try {
      const response = await axios.post(
        `${process.env.EMAIL_SERVICE_API}/api/email`,
        payload,
      );

      console.log('response', response);

      // const info = await this.mailService.sendMail({
      //   from: process.env.EMAIL_USERNAME,
      //   to,
      //   subject: 'Brgy. Lower Lodiong Notification',
      //   text: message,
      // });
    } catch (err) {
      console.log('email error', err);
    }
  }
}
