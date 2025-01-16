import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { FindAllRequestsDto } from './dto/find-all-requests.dto';
export declare class RequestController {
    private requestService;
    constructor(requestService: RequestService);
    create(payload: CreateRequestDto): Promise<{
        id: number;
        requestType: string;
        status: import(".prisma/client").$Enums.REQUEST_STATUS;
        purpose: string;
        dateRequested: Date;
        dateCompleted: Date;
        requestMode: import(".prisma/client").$Enums.REQUEST_MODE;
        residentId: number;
        rejectionReason: string;
    }>;
    update(id: number, payload: CreateRequestDto): Promise<{
        id: number;
        requestType: string;
        status: import(".prisma/client").$Enums.REQUEST_STATUS;
        purpose: string;
        dateRequested: Date;
        dateCompleted: Date;
        requestMode: import(".prisma/client").$Enums.REQUEST_MODE;
        residentId: number;
        rejectionReason: string;
    }>;
    fetch(): Promise<FindAllRequestsDto[]>;
    findByResident(id: number): Promise<FindAllRequestsDto[]>;
}
