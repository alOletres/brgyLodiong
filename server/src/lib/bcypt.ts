import { hash } from 'bcrypt';

export const hashPassword = async (password: string) => {
  const saltRounds = parseInt(process.env.SALTROUND);

  if (!saltRounds) return undefined;

  return await hash(password, saltRounds);
};
