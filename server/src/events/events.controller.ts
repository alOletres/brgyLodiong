import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { multerOption } from 'src/lib/multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEventsDto } from './dto/create-events.dto';
import { generateImagePath } from 'src/lib/filereader';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import { FindAllEventsDto } from './dto/findall-events.dto';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('eventImage', multerOption),
  ) /** <--- image file */
  async create(
    @UploadedFile() eventImage: Express.Multer.File,
    @Body() payload: CreateEventsDto,
  ) {
    const imagePath = generateImagePath(eventImage);

    return await this.eventsService.create({
      ...payload,
      eventImage: imagePath,
    });
  }

  @Put('/:id')
  @UseInterceptors(
    FileInterceptor('eventImage', multerOption),
  ) /** <--- image file */
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() eventImage: Express.Multer.File,
    @Body() payload: CreateEventsDto,
  ) {
    const imagePath = generateImagePath(eventImage);

    return await this.eventsService.update(id, {
      ...payload,
      eventImage: imagePath,
    });
  }

  @Get()
  @ApiExtraModels(FindAllEventsDto)
  @ApiResponse({ type: FindAllEventsDto, isArray: true, status: 200 })
  async fetch() {
    return await this.eventsService.fetch();
  }
}
