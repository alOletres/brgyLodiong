import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ResidentsModule } from './residents/residents.module';
import { OfficialsModule } from './officials/officials.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { RequestModule } from './request/request.module';
import { ProjectsModule } from './projects/projects.module';
import { EventsModule } from './events/events.module';
import { TwilioService } from './twilio/twilio.service';
import { NotificationModule } from './notification/notification.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email/email.service';
import { NotificationService } from './notification/notification.service';
import { MailgunService } from './mailgun/mailgun.service';
@Module({
  imports: [
    AuthModule,
    ResidentsModule,
    OfficialsModule,
    RequestModule,
    ProjectsModule,
    EventsModule,
    NotificationModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    TwilioService,
    EmailService,
    NotificationService,
    MailgunService,
  ],
})
export class AppModule {}
