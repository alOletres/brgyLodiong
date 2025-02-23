/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useSnackbar } from "@/components/hooks/useSnackbar";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { setToken } from "@/lib/tokenStorage";
import { useRouter } from "next/navigation";
import { EROUTE_PROTECTED } from "@/constants/route.enum";
import { CreateResidentsDto } from "@/store/api/gen/residents";
import { jwtDecode } from "jwt-decode";
import { UserRole } from "../../store/api/gen/residents";
import { handleTryCatchError, isError } from "@/utils/error";
import { Field } from "@/components/hooks/useModal";
import { OptionSelect, SelectFieldProps } from "@/components/Select";
import { CustomInputProps } from "@/components/TextFieldInput";
import { TextareaAutosizeProps } from "@mui/material";
import { civilStatusArray } from "../residents/hook";

interface ILoginPayload {
  username: string;
  password: string;
}

export const residentInitialValues: any = {
  firstname: "",
  lastname: "",
  email: "",
  contact: "",
  address: "",
  password: "",
  civilStatus: "SINGLE",
};

export const useHooks = () => {
  const [initialValues] = useState<ILoginPayload>({
    username: "",
    password: "",
  });
  const { setSnackbarProps } = useSnackbar();
  const { push } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  // const { handleCreate: create } = useResidentsApi();

  const fields: Field<
    SelectFieldProps | CustomInputProps | TextareaAutosizeProps
  >[] = [
    {
      fieldType: "text",
      fieldProps: {
        id: "firstname",
        name: "firstname",
        label: "Firstname",
        type: "text",
        margin: "dense",
      },
    },

    {
      fieldType: "text",
      fieldProps: {
        id: "lastname",
        name: "lastname",
        label: "Lastname",
        type: "text",
        margin: "dense",
      },
    },

    {
      fieldType: "select",
      fieldProps: <SelectFieldProps>{
        id: "civilStatus",
        label: "Select status",
        name: "civilStatus",
        inputLabelId: "civilStatus",
        labelId: "civilStatus",
        options: civilStatusArray.map((value): OptionSelect => {
          return { key: value, value };
        }),

        margin: "dense",
      },
    },

    {
      fieldType: "text",
      fieldProps: {
        id: "email",
        name: "email",
        label: "Email",
        type: "text",
        margin: "dense",
      },
    },
    {
      fieldType: "text",
      fieldProps: <CustomInputProps>{
        id: "contact",
        name: "contact",
        label: "Contact",
        type: "text",
        margin: "dense",
      },
    },
    {
      fieldType: "textarea",
      fieldProps: {
        label: "Address",
        name: "address",
        id: "address",
        type: "textarea",
        margin: "dense",
        placeholder: "Home Address",
      },
    },

    {
      fieldType: "text",
      fieldProps: {
        id: "password",
        name: "password",
        label: "Password",
        type: "password",
        margin: "dense",
      },
    },

    {
      fieldType: "text",
      fieldProps: {
        id: "confirmPassword",
        name: "confirmPassword",
        label: "confirmPassword",
        type: "password",
        margin: "dense",
      },
    },
  ];
  const handleToggleModal = () => {
    window.open("/signup", "_blank"); // Opens in a new tab
    // setOpen((state) => !state);
  };

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

      if (isError(response)) throw new Error(response.message);

      setToken(response.data.access_token);

      setLoader(false);
      setSubmitting(true);
      resetForm();
      setSnackbarProps({ message: "User successfully login.." });
      const decodedToken = jwtDecode(response.data.access_token) as {
        role: UserRole;
      };
      if (decodedToken?.role === "RESIDENT") {
        push(EROUTE_PROTECTED.REQUEST);
      } else {
        push(EROUTE_PROTECTED.DASHBOARD);
      }
    } catch (err) {
      setLoader(false);

      const error = handleTryCatchError(err);

      setSnackbarProps({ message: error, severity: "error" });
    }
  };

  const handleSignUp = async (
    values: CreateResidentsDto,
    { resetForm, setSubmitting }: FormikHelpers<CreateResidentsDto>
  ) => {
    try {
      // const result = await create({
      //   ...values,
      //   status: "PENDING",
      //   contact: `+63${values.contact}`,
      // });

      setSubmitting(false);
      setOpen(false);
      resetForm();
      setSnackbarProps({
        message: "Resident successfully created!",
        severity: "success",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      console.log("errorrs", err);

      setSnackbarProps({
        message:
          "Oops! Please check your email and ensure it hasn’t already been registered.",
        severity: "error",
      });
    }
  };

  return {
    loader,
    handleSubmit,
    handleSignUp,
    initialValues,
    handleToggleModal,
    residentInitialValues,
    open,
    fields,
  };
};
