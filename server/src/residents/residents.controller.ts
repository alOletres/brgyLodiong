import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ResidentsService } from './residents.service';
import { CreateResidentsDto } from './dto/create-residents.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import { FindAllResidentsDto } from './dto/find-all.residents.dto';

@UseGuards(JwtAuthGuard)
@Controller('residents')
export class ResidentsController {
  constructor(private residentService: ResidentsService) {}

  @Post('/')
  async create(@Body() payload: CreateResidentsDto) {
    await this.residentService.create(payload);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateResidentsDto,
  ) {
    await this.residentService.update(id, payload);
  }

  @Get('/')
  @ApiExtraModels(FindAllResidentsDto)
  @ApiResponse({ type: FindAllResidentsDto, isArray: true, status: 200 })
  async fetch() {
    return this.residentService.fetch();
  }
}
