/* eslint-disable @typescript-eslint/no-explicit-any */
import { authApi } from "@/store/enhanceApi";

export const useAuthApi = () => {
  const [login] = authApi.useAppControllerLoginMutation();

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await login({ email, password } as any);
    } catch (err) {
      throw err;
    }
  };

  return { handleLogin };
};
