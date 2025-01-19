import { Module } from '@nestjs/common';
import { ResidentsController } from './residents.controller';
import { ResidentsService } from './residents.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TwilioService } from 'src/twilio/twilio.service';
import { EmailService } from 'src/email/email.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [ResidentsController],
  providers: [
    ResidentsService,
    NotificationService,
    PrismaService,
    TwilioService,
    EmailService,
  ],
})
export class ResidentsModule {}
