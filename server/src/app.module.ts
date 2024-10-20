import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ResidentsModule } from './residents/residents.module';
import { OfficialsModule } from './officials/officials.module';

@Module({
  imports: [AuthModule, ResidentsModule, OfficialsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
