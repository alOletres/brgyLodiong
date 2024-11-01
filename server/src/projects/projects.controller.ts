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
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProjectsDto } from './dto/create-projects.dto';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import { FindAllProjectsDto } from './dto/find-all-projects.dto';

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

  @Get('/')
  @ApiExtraModels(FindAllProjectsDto)
  @ApiResponse({ type: FindAllProjectsDto, status: 200, isArray: true })
  async fetch() {
    return await this.projectsService.fetch();
  }
}
