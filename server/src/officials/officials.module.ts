import { Module } from '@nestjs/common';
import { OfficialsController } from './officials.controller';
import { OfficialsService } from './officials.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [OfficialsController],
  providers: [OfficialsService, PrismaService],
})
export class OfficialsModule {}
