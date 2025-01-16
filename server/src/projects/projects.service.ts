import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectsDto } from './dto/create-projects.dto';
import { FindAllProjectsDto } from './dto/find-all-projects.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateProjectsDto) {
    try {
      console.log('payload', payload);

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
    const projects = await this.prisma.projects.findMany({
      select: {
        id: true,
        members: true,
        projectName: true,
        description: true,
        startDate: true,
        endDate: true,
        officialId: true,
        official: {
          select: {
            firstname: true,
            lastname: true,
            position: true,
          },
        },
        status: true,
      },
    });

    return projects.map((value) => {
      const { official, ...data } = value;

      return {
        ...data,
        officialName: `${official.position} ${official.firstname} ${official.lastname}`,
      };
    });
  }
}
