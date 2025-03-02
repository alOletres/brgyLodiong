/* eslint-disable @typescript-eslint/no-explicit-any */
import { decodeToken, removeToken } from "@/lib/tokenStorage";
import { FindAllResidentsDto } from "@/store/api/gen/residents";
import { useResidentsApi } from "@/store/api/hooks/residents";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSnackbar } from "./useSnackbar";
import { useRequestApi } from "@/store/api/hooks/request";

export const useAppBar = () => {
  const pathName = usePathname();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const {
    residents,
    handleUpdateResidentStatus: updateResidentStatus,
    isFetchingResidents,
  } = useResidentsApi();

  const { requests } = useRequestApi();

  const { setSnackbarProps } = useSnackbar();

  const dataSourceRequest = useMemo(
    () =>
      requests?.length
        ? requests.filter((value) => value.status === "PENDING")
        : [],
    [requests]
  );

  const dataSource = useMemo(
    () =>
      residents?.length
        ? residents.filter((value) => value.status === "PENDING")
        : [],
    [residents]
  );

  const handleApprove = async (element: FindAllResidentsDto) => {
    try {
      await updateResidentStatus(element.id, "REGISTERED");

      setSnackbarProps({
        message: "Resident successfully registered",
        severity: "success",
      });
    } catch (err: any) {
      setSnackbarProps({
        message: err?.message || "Something went wrong, Try again!",
        severity: "error",
      });
    }
  };
  return {
    handleSignOut,
    resident,
    open,
    handleClick,
    handleClose,
    anchorEl,
    dataSource,
    handleApprove,
    isFetchingResidents,
    dataSourceRequest,
  };
};
