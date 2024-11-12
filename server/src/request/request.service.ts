import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { FindAllRequestsDto } from './dto/find-all-requests.dto';
import { REQUEST_STATUS } from '@prisma/client';

@Injectable()
export class RequestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateRequestDto) {
    try {
      const isCompleted = payload.status === REQUEST_STATUS.COMPLETED;

      await this.prisma.requests.create({
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
      await this.prisma.requests.update({
        where: { id },
        data: {
          ...payload,
          dateCompleted: isCompleted ? new Date().toISOString() : undefined,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async fetch(): Promise<FindAllRequestsDto[]> {
    const requests = await this.prisma.requests.findMany({
      select: {
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
            firstname: true,
            lastname: true,
            address: true,
            email: true,
            contact: true,
          },
        },
      },
    });

    return requests.map((value) => {
      const { resident, ...data } = value;

      return {
        ...data,
        requestedBy: `${resident.firstname} ${resident.lastname}`,
        address: resident.address,
        contact: resident.contact,
        email: resident.email,
      };
    });
  }
}
