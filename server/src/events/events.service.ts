import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventsDto } from './dto/create-events.dto';
import { Prisma } from '@prisma/client';
import { FindAllEventsDto } from './dto/findall-events.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateEventsDto) {
    try {
      await this.prisma.events.create({ data: { ...payload } });
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, payload: CreateEventsDto) {
    try {
      await this.prisma.events.update({ where: { id }, data: { ...payload } });
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
