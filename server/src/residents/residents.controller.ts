import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ResidentsService } from './residents.service';
import { CreateResidentsDto } from './dto/create-residents.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('residents')
export class ResidentsController {
  constructor(private residentService: ResidentsService) {}

  @Post('create')
  async create(@Body() payload: CreateResidentsDto) {
    await this.residentService.create(payload);
  }
}
