import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';
import { TwilioService } from 'src/twilio/twilio.service';
import { ResidentsService } from 'src/residents/residents.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  providers: [
    EventsService,
    PrismaService,
    ResidentsService,
    EmailService,
    TwilioService,
    NotificationService,
  ],
  controllers: [EventsController],
})
export class EventsModule {}
