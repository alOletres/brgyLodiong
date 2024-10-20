import { Injectable } from '@nestjs/common';
import { Auth } from 'src/_gen-prisma-classes/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare } from 'bcrypt';
import { CreateResidentsDto } from 'src/residents/dto/create-residents.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: Pick<Auth, 'email' | 'password'>) {
    const { password: hashPassword, ...data } = await this.findOneUser(email);

    const isMatch = await compare(password, hashPassword);

    if (!isMatch) return null;

    return data;
  }

  async login(user: CreateResidentsDto) {
    const access_token = this.jwtService.sign(user, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '1d',
    });

    return {
      access_token,
    };
  }

  async findOneUser(email: string) {
    return await this.prismaService.auth.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        status: true,
        role: true,
        lastLoggedIn: true,
        resident: {
          select: {
            firstname: true,
            lastname: true,
            contact: true,
            address: true,
          },
        },
      },
    });
  }
}
