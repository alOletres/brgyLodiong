import { NotificationService } from './notification.service';
import { FindAllNotificationsDto } from './dto/findall-notifications.dto';
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    fetch(): Promise<FindAllNotificationsDto[]>;
}
