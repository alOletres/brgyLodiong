"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedResidents = void 0;
const bcypt_1 = require("../../src/lib/bcypt");
const residents_service_1 = require("../../src/residents/residents.service");
const en_1 = require("@faker-js/faker/locale/en");
const seedResidents = async ({ app, email }) => {
    console.log('Seeding admin user...');
    const residentService = app.get(residents_service_1.ResidentsService);
    const hash = (0, bcypt_1.hashPassword)(process.env.DEFAULT_PASSWORD || 'test');
    await residentService.create({
        email,
        password: hash,
        role: 'ADMIN',
        firstname: en_1.faker.person.firstName(),
        lastname: en_1.faker.person.lastName(),
        address: en_1.faker.location.streetAddress(),
        contact: en_1.faker.phone.number(),
    });
    console.log('Successfully seeded...');
};
exports.seedResidents = seedResidents;
//# sourceMappingURL=seed.resident.js.map