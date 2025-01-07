import { INestApplicationContext } from '@nestjs/common';
interface ISeedResidentsPayload {
    app: INestApplicationContext;
    email: string;
}
export declare const seedResidents: ({ app, email }: ISeedResidentsPayload) => Promise<void>;
export {};
