import { removeToken } from "@/lib/tokenStorage";
import { usePathname, useRouter } from "next/navigation";

export const useAppBar = () => {
  const pathName = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    removeToken();
    if (!pathName.includes("/login")) {
      router.push("/");
    }
  };

  return { handleSignOut };
};
