import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(payload: CreateNotificationDto): Promise<void>;
    fetch(): Promise<void>;
}
