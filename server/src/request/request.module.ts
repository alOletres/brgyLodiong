import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [RequestService, PrismaService],
  controllers: [RequestController],
})
export class RequestModule {}
