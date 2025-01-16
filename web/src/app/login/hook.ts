/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useSnackbar } from "@/components/hooks/useSnackbar";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { setToken } from "@/lib/tokenStorage";
import { useRouter } from "next/navigation";
import { EROUTE_PROTECTED } from "@/constants/route.enum";
import { useResidentsApi } from "@/store/api/hooks/residents";
import { CreateResidentsDto } from "@/store/api/gen/residents";

interface ILoginPayload {
  username: string;
  password: string;
}

export const useHooks = () => {
  const [initialValues] = useState<ILoginPayload>({
    username: "",
    password: "",
  });
  const { setSnackbarProps } = useSnackbar();
  const { push } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  const { handleCreate: create } = useResidentsApi();
  const handleToggleModal = () => setOpen((state) => !state);

  const handleSubmit = async (
    values: ILoginPayload,
    { setSubmitting, resetForm }: FormikHelpers<ILoginPayload>
  ) => {
    try {
      setLoader(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/login`,
        values
      );

      setToken(response.data.access_token);

      setLoader(false);
      setSubmitting(true);
      resetForm();
      setSnackbarProps({ message: "User successfully login.." });

      push(EROUTE_PROTECTED.DASHBOARD);
    } catch (err) {
      throw err;
    }
  };

  const handleSignUp = async (
    values: CreateResidentsDto,
    { resetForm, setSubmitting }: FormikHelpers<CreateResidentsDto>
  ) => {
    try {
      await create({ ...values, contact: `+63${values.contact}` });
      setSubmitting(false);
      setOpen(false);
      resetForm();
      setSnackbarProps({
        message: "Resident successfully created!",
        severity: "success",
      });
    } catch (err: any) {
      console.log("err", err);
      setSnackbarProps({ message: err?.message, severity: "error" });
    }
  };

  return {
    loader,
    handleSubmit,
    handleSignUp,
    initialValues,
    handleToggleModal,
    open,
  };
};
