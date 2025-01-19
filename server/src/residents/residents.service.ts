import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResidentsDto } from './dto/create-residents.dto';
import { hashPassword } from 'src/lib/bcypt';
import { FindAllResidentsDto } from './dto/find-all.residents.dto';
import { Prisma, RESIDENT_STATUS } from '@prisma/client';
import { TwilioService } from 'src/twilio/twilio.service';
import { EmailService } from 'src/email/email.service';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class ResidentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly twilioService: TwilioService,
    private readonly emailService: EmailService,
    private readonly notificationService: NotificationService,
  ) {}

  private selectedResidents = {
    id: true,
    firstname: true,
    lastname: true,
    civilStatus: true,
    email: true,
    address: true,
    contact: true,
    status: true,
    createdAt: true,
    disApprovedReason: true,
    Auth: {
      select: { role: true },
    },
  };

  async create({
    password,
    role = 'RESIDENT',
    ...payload
  }: CreateResidentsDto) {
    try {
      const hash = hashPassword(password);
      await this.prisma.residents.create({
        data: {
          ...payload,
          Auth: {
            create: {
              email: payload.email,
              password: hash,
              role,
            },
          },
        },
      });
      const message = `Dear Mr/Mrs. ${payload.firstname} ${payload.lastname}, your account is pending. We will notify you once the review is complete. Brgy. Lower Lodiong Tambulig, Zamboanga del Sur.`;
      // Send to resident mobile number
      await this.twilioService.sendSms(payload.contact, message);

      // Send to resident email account
      await this.emailService.sendMail({ to: payload.email, message });
    } catch (err) {
      console.log('err', err);

      throw err;
    }
  }

  async update(id: number, { password, role, ...payload }: CreateResidentsDto) {
    try {
      const hash = hashPassword(password);
      await this.prisma.residents.update({
        where: { id },
        data: {
          ...payload,
          Auth: {
            update: {
              email: payload.email,
              password: hash,
              role: role,
            },
          },
        },
      });

      let message = '';

      if (payload.status === 'REGISTERED') {
        message = `Dear Mr/Mrs. ${payload.firstname} ${payload.lastname}, your account is successfully registered. Welcome to Brgy. Lower Lodiong Tambulig, Zamboanga del Sur.`;
      } else if (payload.status === 'DISAPPROVED') {
        message = `Dear Mr/Mrs. ${payload.firstname} ${payload.lastname}, your account application has been disapproved. Contact Brgy. Lower Lodiong Tambulig, Zamboanga del Sur for more details.`;
      }

      // Send to resident mobile number
      // await this.twilioService.sendSms(payload.contact, message);

      // Send to resident email account
      await this.emailService.sendMail({ to: payload.email, message });
    } catch (err) {
      throw err;
    }
  }

  async fetch(): Promise<FindAllResidentsDto[]> {
    try {
      const residents = await this.prisma.residents.findMany({
        select: {
          ...this.selectedResidents,
        },
        orderBy: { createdAt: Prisma.SortOrder.desc },
      });

      return residents.map((value) => {
        const { Auth, ...data } = value;

        return {
          ...data,

          role: Auth?.role || 'RESIDENT',
        };
      });
    } catch (err) {
      console.log('err', err);

      throw err;
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.residents.findUnique({ where: { id } });
    } catch (err) {
      throw err;
    }
  }

  async fetchByStatus(status: RESIDENT_STATUS): Promise<FindAllResidentsDto[]> {
    try {
      const result = await this.prisma.residents.findMany({
        where: { status },
        select: {
          ...this.selectedResidents,
        },
        orderBy: { createdAt: Prisma.SortOrder.desc },
      });

      return result.map((value) => {
        const { Auth, ...data } = value;

        return {
          ...data,

          role: Auth?.role || 'RESIDENT',
        };
      });
    } catch (err) {
      throw err;
    }
  }
}
