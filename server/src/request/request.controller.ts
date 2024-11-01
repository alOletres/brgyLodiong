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
import { RequestService } from './request.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateRequestDto } from './dto/create-request.dto';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import { FindAllRequestsDto } from './dto/find-all-requests.dto';

@UseGuards(JwtAuthGuard)
@Controller('request')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Post('/')
  async create(@Body() payload: CreateRequestDto) {
    return await this.requestService.create(payload);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateRequestDto,
  ) {
    return await this.requestService.update(id, payload);
  }

  @Get('/')
  @ApiExtraModels(FindAllRequestsDto)
  @ApiResponse({ type: FindAllRequestsDto, isArray: true, status: 200 })
  async fetch() {
    return await this.requestService.fetch();
  }
}
