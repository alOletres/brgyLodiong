import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { FindAllRequestsDto } from './dto/find-all-requests.dto';

@Injectable()
export class RequestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateRequestDto) {
    try {
      await this.prisma.requests.create({ data: { ...payload } });
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, payload: CreateRequestDto) {
    try {
      await this.prisma.requests.update({
        where: { id },
        data: { ...payload },
      });
    } catch (err) {
      throw err;
    }
  }

  async fetch(): Promise<FindAllRequestsDto[]> {
    return await this.prisma.requests.findMany({
      select: {
        id: true,
        requestType: true,
        status: true,
        dateRequested: true,
        dateCompleted: true,
        purpose: true,
        requestMode: true,
        resident: {
          select: {
            firstname: true,
            lastname: true,
            address: true,
            email: true,
            contact: true,
          },
        },
      },
    });
  }
}
