import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectsDto } from './dto/create-projects.dto';
import { FindAllProjectsDto } from './dto/find-all-projects.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateProjectsDto) {
    try {
      await this.prisma.projects.create({ data: { ...payload } });
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, payload: CreateProjectsDto) {
    try {
      await this.prisma.projects.update({
        where: { id },
        data: { ...payload },
      });
    } catch (err) {
      throw err;
    }
  }

  async fetch(): Promise<FindAllProjectsDto[]> {
    return await this.prisma.projects.findMany({
      select: {
        id: true,
        projectName: true,
        description: true,
        startDate: true,
        endDate: true,
        official: {
          select: {
            firstname: true,
            lastname: true,
            achievements: true,
            startTerm: true,
            endTerm: true,
            position: true,
          },
        },
      },
    });
  }
}
