import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProjectsDto } from './dto/create-projects.dto';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import { FindAllProjectsDto } from './dto/find-all-projects.dto';
import { multerOption } from 'src/lib/multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { generateFileName } from 'src/lib/filereader';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post('/')
  async create(@Body() payload: CreateProjectsDto) {
    return await this.projectsService.create(payload);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateProjectsDto,
  ) {
    return await this.projectsService.update(id, payload);
  }

  @Put('files/:id')
  @UseInterceptors(FilesInterceptor('files', 10, multerOption)) // Accept up to 10 files
  async uploadFiles(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log('files', files);

    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }
    const documents = files.map((file) => generateFileName(file));
    return await this.projectsService.uploadFiles(id, documents);
  }

  @Get('/')
  @ApiExtraModels(FindAllProjectsDto)
  @ApiResponse({ type: FindAllProjectsDto, status: 200, isArray: true })
  async fetch() {
    return await this.projectsService.fetch();
  }
}
