"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const enquirer_1 = require("enquirer");
const application_config_1 = require("../src/application.config");
const seed_resident_1 = require("./seeder/seed.resident");
const prisma = new client_1.PrismaClient();
const questions = [
    {
        type: 'input',
        name: 'email',
        message: 'Hello Admin, Please enter your valid email',
        async validate(value) {
            const isExist = await prisma.auth.findUnique({ where: { email: value } });
            if (isExist) {
                return false;
            }
            return true;
        },
    },
];
const fetchAnswers = async () => {
    const answers = await (0, enquirer_1.prompt)(questions);
    return answers;
};
const main = async () => {
    const app = await (0, application_config_1.createStandaloneApplication)({ logger: ['error'] });
    const { email } = await fetchAnswers();
    await (0, seed_resident_1.seedResidents)({ app, email });
};
main()
    .catch((e) => {
    console.log(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
});
//# sourceMappingURL=seed.js.map