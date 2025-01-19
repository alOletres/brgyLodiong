import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TwilioService } from 'src/twilio/twilio.service';
import { ResidentsService } from 'src/residents/residents.service';
import { NotificationService } from 'src/notification/notification.service';
import { EmailService } from 'src/email/email.service';

@Module({
  providers: [
    RequestService,
    PrismaService,
    TwilioService,
    ResidentsService,
    NotificationService,
    EmailService,
  ],
  controllers: [RequestController],
})
export class RequestModule {}
