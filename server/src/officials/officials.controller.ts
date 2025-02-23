import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { OfficialsService } from './officials.service';
import { CreateOfficialsDto } from './dto/create-official.dto';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import { FindAllOfficialsDto } from './dto/find-all.dto';

@Controller('officials')
export class OfficialsController {
  constructor(private officialsService: OfficialsService) {}

  @Post('/')
  async create(@Body() payload: CreateOfficialsDto) {
    await this.officialsService.create({ ...payload });
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateOfficialsDto,
  ) {
    await this.officialsService.update(id, payload);
  }

  @Get('/')
  @ApiExtraModels(FindAllOfficialsDto)
  @ApiResponse({ status: 200, type: FindAllOfficialsDto, isArray: true })
  async fetch() {
    return await this.officialsService.fetch();
  }
}
