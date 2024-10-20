import { PrismaClient } from '@prisma/client';
import { prompt } from 'enquirer';
import { createStandaloneApplication } from 'src/application.config';
import { seedResidents } from './seeder/seed.resident';

const prisma = new PrismaClient();

const questions = [
  {
    type: 'input',
    name: 'email',
    message: 'Hello Admin, Please enter your valid email',
    async validate(value: string) {
      const isExist = await prisma.auth.findUnique({ where: { email: value } });
      if (isExist) {
        // 'This email is already exist, Please try other email'
        return false;
      }

      return true;
    },
  },
];

interface IAnswers {
  email: string;
}

const fetchAnswers = async () => {
  const answers: IAnswers = await prompt(questions);

  return answers;
};

const main = async () => {
  const app = await createStandaloneApplication({ logger: ['error'] });
  const { email } = await fetchAnswers();

  await seedResidents({ app, email });
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
