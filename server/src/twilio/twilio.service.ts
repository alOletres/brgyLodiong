import { Injectable } from '@nestjs/common';
import { REQUEST_STATUS } from '@prisma/client';
import moment from 'moment';
import twilio from 'twilio';

interface TwilioConfig {
  accountSid: string;
  authToken: string;
  twilioPhoneNumber: string;
}

@Injectable()
export class TwilioService {
  private readonly twilioClient: twilio.Twilio;
  private readonly config: TwilioConfig;

  constructor() {
    this.config = {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
      twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
    };
    this.twilioClient = twilio(this.config.accountSid, this.config.authToken);
  }

  async sendSms(to: string, body: string): Promise<void> {
    await this.twilioClient.messages.create({
      body,
      from: this.config.twilioPhoneNumber,
      to,
    });
  }

  notifyResident(
    residentName: string,
    requestType: string,
    status: REQUEST_STATUS,
  ) {
    switch (status) {
      case 'APPROVED':
        return `
        Dear ${residentName}, We are pleased to inform you that your request for a Certificate of ${requestType} has been approved. You may now proceed to the barangay office to claim your certificate. Please bring a valid ID. Open within working hours fom 8am to 5pm, closed weekends, and holidays. If you have any questions or require further assistance, please don’t hesitate to contact us. thank you for your cooperation`;
      case 'COMPLETED':
        return `
        Dear ${residentName}, Your request for a Certificate of ${requestType} has been successfully completed. You may now claim it at the barangay office during office hours.`;

      case 'CLAIMED':
        return `
        Dear ${residentName}, This is to confirm that your requested Certificate of ${requestType} has been successfully claimed from the barangay office on ${moment(
          new Date(),
        ).format('ll')}`;

      case 'UNCLAIMED':
        return `
        Dear ${residentName}, We would like to remind you that your requested Certificate of ${requestType} is ready for pickup at the barangay office`;

      case 'REJECTED':
        return `
        Dear ${residentName}, We regret to inform you that your request for a Certificate of ${requestType} has been rejected, If you have any questions, feel free to visit the barangay office for further clarification.`;
    }
  }
}
