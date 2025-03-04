import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventsDto } from './dto/create-events.dto';
import { Prisma } from '@prisma/client';
import { FindAllEventsDto } from './dto/findall-events.dto';
import { TwilioService } from 'src/twilio/twilio.service';
import { ResidentsService } from 'src/residents/residents.service';
import moment from 'moment';
import { MailgunService } from 'src/mailgun/mailgun.service';

@Injectable()
export class EventsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly twilioService: TwilioService,
    private readonly mailgunService: MailgunService,
    private readonly residentService: ResidentsService,
  ) {}

  async notificationBlasting(payload: CreateEventsDto) {
    const registeredResidents = await this.residentService.fetchByStatus(
      'REGISTERED',
    );

    await Promise.all(
      registeredResidents.map(async (resident) => {
        // Message
        const message = `Hi Mr/Mrs. ${resident.firstname} ${
          resident.lastname
        } 🎉 Join us at ${payload.location} on ${moment(
          payload.eventDate,
        ).format('MM/DD/YYYY')} at ${moment(payload.eventDate).format(
          'LT',
        )} for ${payload.eventName}. ${payload.description}`;

        // Send event ot every resident email
        // await this.mailgunService.sendMail({
        //   to: resident.email,
        //   text: message,
        // });

        // Send events to every residents mobile number
        await this.twilioService.sendSms(resident.contact, message);
        return resident;
      }),
    );
  }

  async create(payload: CreateEventsDto) {
    try {
      await this.prisma.events.create({ data: { ...payload } });

      await this.notificationBlasting(payload);
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, payload: CreateEventsDto) {
    try {
      await this.prisma.events.update({ where: { id }, data: { ...payload } });

      await this.notificationBlasting(payload);
    } catch (err) {
      throw err;
    }
  }

  async fetch(): Promise<FindAllEventsDto[]> {
    return await this.prisma.events.findMany({
      orderBy: { eventDate: Prisma.SortOrder.desc },
    });
  }
}
