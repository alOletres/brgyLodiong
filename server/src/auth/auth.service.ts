import { Injectable } from '@nestjs/common';
import { Auth } from 'src/_gen-prisma-classes/auth';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async validateUser({ email, password }: Pick<Auth, 'email' | 'password'>) {
    console.log('validate', email, password);

    return { email, password };
  }
}
