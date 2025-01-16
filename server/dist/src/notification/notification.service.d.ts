import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { FindAllNotificationsDto } from './dto/findall-notifications.dto';
export declare class NotificationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(payload: CreateNotificationDto): Promise<void>;
    fetch(): Promise<FindAllNotificationsDto[]>;
}
