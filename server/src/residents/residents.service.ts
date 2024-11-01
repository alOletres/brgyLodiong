import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResidentsDto } from './dto/create-residents.dto';
import { hashPassword } from 'src/lib/bcypt';
import { FindAllResidentsDto } from './dto/find-all.residents.dto';

@Injectable()
export class ResidentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    password,
    role = 'RESIDENT',
    ...payload
  }: CreateResidentsDto) {
    try {
      const hash = await hashPassword(password);
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
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, { password, role, ...payload }: CreateResidentsDto) {
    try {
      const hash = await hashPassword(password);
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
    } catch (err) {
      throw err;
    }
  }

  async fetch(): Promise<FindAllResidentsDto[]> {
    try {
      const residents = await this.prisma.residents.findMany({
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          address: true,
          contact: true,
          Auth: { select: { role: true, status: true } },
        },
      });

      return residents.map((value) => {
        const { Auth, ...data } = value;
        return {
          ...data,
          role: Auth.role,
          status: Auth.status,
        };
      });
    } catch (err) {
      throw err;
    }
  }
}
