import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

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

  async fetch() {
    try {
      await this.prisma.notifications.findMany({
        select: { id: true },
      });
    } catch (err) {
      throw err;
    }
  }
}
