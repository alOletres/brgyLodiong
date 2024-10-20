import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResidentsDto } from './dto/create-residents.dto';
import { hashPassword } from 'src/lib/bcypt';

@Injectable()
export class ResidentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    password,
    role = 'RESIDENT',
    ...payload
  }: CreateResidentsDto) {
    try {
      const hash = await hashPassword(password);
      await this.prismaService.residents.create({
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
}
