import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { FindAllRequestsDto } from './dto/find-all-requests.dto';
import { Prisma, REQUEST_STATUS } from '@prisma/client';
import { TwilioService } from 'src/twilio/twilio.service';
import { ResidentsService } from 'src/residents/residents.service';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class RequestService {
  private selectRequestProperties = {
    id: true,
    requestType: true,
    status: true,
    dateRequested: true,
    dateCompleted: true,
    purpose: true,
    requestMode: true,
    residentId: true,
    resident: {
      select: {
        id: true,
        firstname: true,
        lastname: true,
        address: true,
        email: true,
        contact: true,
        civilStatus: true,
      },
    },
  };
  constructor(
    private readonly prisma: PrismaService,
    private twilioService: TwilioService,
    private residentService: ResidentsService,
    private notificationService: NotificationService,
  ) {}

  async create(payload: CreateRequestDto) {
    try {
      const isCompleted = payload.status === REQUEST_STATUS.COMPLETED;

      return await this.prisma.requests.create({
        data: {
          ...payload,
          dateCompleted: isCompleted ? new Date().toISOString() : undefined,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, payload: CreateRequestDto) {
    try {
      const isCompleted = payload.status === REQUEST_STATUS.COMPLETED;

      if (payload.status !== 'PENDING') {
        // Get the resident
        const { firstname, lastname, contact } =
          await this.residentService.findOne(payload.residentId);

        const completeName = `${firstname} ${lastname}`;
        // Set a message to notify resident about the request documents status
        const body = this.twilioService.notifyResident(
          completeName,
          payload.requestType,
          payload.status,
        );
        // Send sms to one resident regarding for his or her request status
        await this.twilioService.sendSms(contact, body);
        // Create the notification send to the resident as a history
        await this.notificationService.create({
          message: body,
          notificationType: 'SMS',
          requestId: id,
          residentId: payload.residentId,
          status: 'SENT',
        });
      }

      return await this.prisma.requests.update({
        where: { id },
        data: {
          ...payload,
          dateCompleted: isCompleted ? new Date().toISOString() : undefined,
        },
      });
    } catch (err) {
      console.log('error', err);

      throw err;
    }
  }

  async fetch(): Promise<FindAllRequestsDto[]> {
    const requests = await this.prisma.requests.findMany({
      select: {
        ...this.selectRequestProperties,
      },
      orderBy: { dateRequested: Prisma.SortOrder.desc },
    });

    return requests.map((value) => {
      const { resident, ...data } = value;

      return {
        ...data,
        requestedId: resident.id,
        requestedBy: `${resident.firstname} ${resident.lastname}`,
        address: resident.address,
        contact: resident.contact,
        email: resident.email,
        civilStatus: resident.civilStatus,
      };
    });
  }

  async findByResident(id: number): Promise<FindAllRequestsDto[]> {
    try {
      const requests = await this.prisma.requests.findMany({
        where: { residentId: id },
        select: { ...this.selectRequestProperties },
        orderBy: { dateRequested: Prisma.SortOrder.desc },
      });

      return requests.map((value) => {
        const { resident, ...data } = value;

        return {
          ...data,
          requestedId: resident.id,
          requestedBy: `${resident.firstname} ${resident.lastname}`,
          address: resident.address,
          contact: resident.contact,
          email: resident.email,
          civilStatus: resident.civilStatus,
        };
      });
    } catch (err) {
      throw err;
    }
  }
}
