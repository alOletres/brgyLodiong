import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOfficialsDto } from './dto/create-official.dto';

@Injectable()
export class OfficialsService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ endTerm = null, ...payload }: CreateOfficialsDto) {
    try {
      await this.prisma.officials.create({
        data: {
          firstname: payload.firstname,
          lastname: payload.lastname,
          position: payload.position,
          startTerm: payload.startTerm,
          achievements: payload.achievements,
          endTerm,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, payload: CreateOfficialsDto) {
    try {
      await this.prisma.officials.update({
        where: { id },
        data: {
          firstname: payload.firstname,
          lastname: payload.lastname,
          position: payload.position,
          startTerm: payload.startTerm,
          endTerm: payload.endTerm,
          achievements: payload.achievements,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async fetch() {
    try {
      const officials = await this.prisma.officials.findMany({
        select: {
          id: true,
          firstname: true,
          lastname: true,
          achievements: true,
          startTerm: true,
          endTerm: true,
          position: true,

          Projects: {
            select: {
              projectName: true,
              description: true,
              startDate: true,
              endDate: true,
            },
          },
        },
      });

      return officials;
    } catch (err) {
      throw err;
    }
  }
}
