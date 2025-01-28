import { Injectable } from '@nestjs/common';
import Mailgun, { MailgunMessageData } from 'mailgun.js';
import FormData from 'form-data';

@Injectable()
export class MailgunService {
  private client = new Mailgun(FormData).client({
    username: 'api',
    key: process.env.MAILGUN_KEY,
  });

  /**
   * Send via API
   *
   * @param data
   */
  async sendMail(data: MailgunMessageData) {
    try {
      const response = await this.client.messages.create(
        process.env.MAILGUN_DOMAIN,
        {
          ...data,
          from: 'mailgun@sandbox64f2849500814639a693339686fd10da.mailgun.org',
          subject: 'Brgy. Lower Lodiong Notification',
        },
      );

      console.log('Mail gun response', response, 'data', data);
    } catch (err) {
      console.log('Mail gun error', err);
    }
  }
}
