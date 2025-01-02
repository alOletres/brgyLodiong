import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventsDto } from './dto/create-events.dto';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import { FindAllEventsDto } from './dto/findall-events.dto';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  async create(@Body() payload: CreateEventsDto) {
    return await this.eventsService.create({
      ...payload,
    });
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateEventsDto,
  ) {
    return await this.eventsService.update(id, {
      ...payload,
    });
  }

  @Get()
  @ApiExtraModels(FindAllEventsDto)
  @ApiResponse({ type: FindAllEventsDto, isArray: true, status: 200 })
  async fetch() {
    return await this.eventsService.fetch();
  }
}
