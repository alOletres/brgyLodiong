import axios from "axios";
import { useSnackbar } from "@/components/hooks/useSnackbar";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { setToken } from "@/lib/tokenStorage";
import { useRouter } from "next/navigation";
import { EROUTE_PROTECTED } from "@/constants/route.enum";

interface ILoginPayload {
  email: string;
  password: string;
}

export const useHooks = () => {
  const [initialValues] = useState<ILoginPayload>({
    email: "",
    password: "",
  });
  const { setSnackbarProps } = useSnackbar();
  const { push } = useRouter();

  const handleSubmit = async (
    values: ILoginPayload,
    { setSubmitting, resetForm }: FormikHelpers<ILoginPayload>
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/login`,
        values
      );

      setToken(response.data.access_token);

      setSubmitting(true);
      resetForm();
      setSnackbarProps({ message: "User successfully login.." });

      push(EROUTE_PROTECTED.OFFICIALS);
    } catch (err) {
      throw err;
    }
  };

  return { handleSubmit, initialValues };
};
