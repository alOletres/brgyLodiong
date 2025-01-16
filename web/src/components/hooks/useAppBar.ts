import { decodeToken, removeToken } from "@/lib/tokenStorage";
import { FindAllResidentsDto } from "@/store/api/gen/residents";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAppBar = () => {
  const pathName = usePathname();
  const router = useRouter();

  const [resident, setResident] = useState<FindAllResidentsDto>(
    {} as FindAllResidentsDto
  );

  useEffect(() => {
    const decoded = decodeToken() as { resident: FindAllResidentsDto };

    if (decoded) {
      setResident(decoded.resident);
    }
  }, []);

  const handleSignOut = () => {
    removeToken();
    if (!pathName.includes("/login")) {
      router.push("/");
    }
  };

  return { handleSignOut, resident };
};
