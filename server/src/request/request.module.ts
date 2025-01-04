import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TwilioService } from 'src/twilio/twilio.service';
import { ResidentsService } from 'src/residents/residents.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  providers: [
    RequestService,
    PrismaService,
    TwilioService,
    ResidentsService,
    NotificationService,
  ],
  controllers: [RequestController],
})
export class RequestModule {}
