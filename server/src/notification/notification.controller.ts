import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import { FindAllNotificationsDto } from './dto/findall-notifications.dto';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get()
  @ApiExtraModels(FindAllNotificationsDto)
  @ApiResponse({ type: FindAllNotificationsDto, isArray: true, status: 200 })
  async fetch() {
    return await this.notificationService.fetch();
  }
}
