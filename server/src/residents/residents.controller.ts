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
import { ResidentsService } from './residents.service';
import { CreateResidentsDto } from './dto/create-residents.dto';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import { FindAllResidentsDto } from './dto/find-all.residents.dto';
import { RESIDENT_STATUS } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from 'src/lib/multer';
import { generateFileName } from 'src/lib/filereader';

@Controller('residents')
export class ResidentsController {
  constructor(private residentService: ResidentsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', multerOption),
  ) /** <--- image file */
  async create(
    @Body() payload: CreateResidentsDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const imageFile = generateFileName(image);
    console.log('payload', payload, image);

    await this.residentService.create({ ...payload, image: imageFile });
  }

  // @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @UseInterceptors(
    FileInterceptor('image', multerOption),
  ) /** <--- image file */
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateResidentsDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    console.log('payload', payload, image);

    const imageFile = generateFileName(image);
    await this.residentService.update(id, { ...payload, image: imageFile });
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  @ApiExtraModels(FindAllResidentsDto)
  @ApiResponse({ type: FindAllResidentsDto, isArray: true, status: 200 })
  async fetch() {
    return this.residentService.fetch();
  }

  @Get('/:status')
  @ApiExtraModels(FindAllResidentsDto)
  @ApiResponse({ type: FindAllResidentsDto, isArray: true, status: 200 })
  async fetchByStatus(@Param('status') status: RESIDENT_STATUS) {
    return this.residentService.fetchByStatus(status);
  }

  @Put('status/:id/:status')
  async updateResidentStatus(
    @Param('id', ParseIntPipe) id: number,
    @Param('status') status: RESIDENT_STATUS,
  ) {
    return await this.residentService.updateResidentStatus(id, status);
  }
}
