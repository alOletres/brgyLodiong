import { hashSync, genSaltSync } from 'bcrypt';

export const hashPassword = (password: string) => {
  const saltRounds = genSaltSync(parseInt(process.env.SALTROUND));

  if (!saltRounds) return undefined;

  return hashSync(password, saltRounds);
};
