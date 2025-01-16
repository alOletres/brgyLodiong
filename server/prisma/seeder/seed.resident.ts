import { INestApplicationContext } from '@nestjs/common';
import { hashPassword } from 'src/lib/bcypt';
import { ResidentsService } from 'src/residents/residents.service';
import { faker } from '@faker-js/faker/locale/en';

interface ISeedResidentsPayload {
  app: INestApplicationContext;
  email: string;
}
export const seedResidents = async ({ app, email }: ISeedResidentsPayload) => {
  console.log('Seeding admin user...');

  const residentService = app.get(ResidentsService);

  const hash = hashPassword(process.env.DEFAULT_PASSWORD || 'test');

  await residentService.create({
    email,
    password: hash,
    role: 'ADMIN',
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    address: faker.location.streetAddress(),
    contact: faker.phone.number(),
    civilStatus: 'SINGLE',
  });

  console.log('Successfully seeded...');
};
