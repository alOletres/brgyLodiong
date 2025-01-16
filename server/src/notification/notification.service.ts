import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { FindAllNotificationsDto } from './dto/findall-notifications.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateNotificationDto) {
    try {
      await this.prisma.notifications.create({ data: { ...payload } });
    } catch (err) {
      throw err;
    }
  }

  async fetch(): Promise<FindAllNotificationsDto[]> {
    try {
      const result = await this.prisma.notifications.findMany({
        select: {
          id: true,
          residents: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              contact: true,
              email: true,
            },
          },
          requests: {
            select: { requestMode: true, requestType: true, purpose: true },
          },
          notificationType: true,
          message: true,
          sentAt: true,
        },
      });

      return result.map((value) => {
        const { residents, requests, ...data } = value;

        return {
          ...data,
          firstname: residents.firstname,
          lastname: residents.lastname,
          contact: residents.contact,
          email: residents.email,
          requestMode: requests.requestMode,
          requestType: requests.requestType,
          purpose: requests.purpose,
          residentId: residents.id,
        };
      });
    } catch (err) {
      throw err;
    }
  }
}
