/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from "@/components/hooks/useModal";
import { OptionSelect, SelectFieldProps } from "@/components/Select";
import { CustomStepperProps, StepperContent } from "@/components/Stepper";
import { CustomInputProps } from "@/components/TextFieldInput";
import { TextareaAutosizeProps } from "@mui/material";
import { civilStatusArray, residentInitialValues } from "../residents/hook";
import { CustomFormGroupProps } from "@/components/FormGroup";
import { ResidentSchema } from "@/schema";
import { useState } from "react";
import { FileUploadProps } from "@/components/fileUploader";
import { CreateResidentsDto } from "@/store/api/gen/residents";
import { FormikHelpers } from "formik";
import { useResidentsApi } from "@/store/api/hooks/residents";
import { useSnackbar } from "@/components/hooks/useSnackbar";

export const useHooks = () => {
  const [files, setFiles] = useState<File[]>([]);

  const { handleCreate } = useResidentsApi();
  const { setSnackbarProps } = useSnackbar();

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
        label: "Confirm Password",
        type: "password",
        margin: "dense",
      },
    },
  ];

  const handleSubmit = async (
    { image, ...values }: CreateResidentsDto,
    helpers?: FormikHelpers<CreateResidentsDto>
  ) => {
    const { setSubmitting, resetForm } =
      helpers as FormikHelpers<CreateResidentsDto>;
    try {
      const payload = {
        ...values,
        contact: `+63${values.contact}`,
      };
      // Create formData
      const formData = new FormData();
      for (const element of Object.keys(payload)) {
        const key = element as keyof Omit<CreateResidentsDto, "image">;
        if (payload[key]) {
          formData.append(key, payload[key]);
        }
      }

      formData.append("image", files[0] as unknown as Blob);

      // Create for resident
      await handleCreate(formData);

      setSubmitting(false);
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

  const formProps: CustomFormGroupProps = {
    initialValues: residentInitialValues,
    validationSchema: ResidentSchema,
    fields,
    onFinish: handleSubmit,
    handleSubmit,
  };

  const fileUploaderProps: FileUploadProps = {
    onChange: setFiles,
    value: files,
    handleSubmit: () => console.log("Upload image"),
    multiple: false,
    accept: ["image/jpeg", "image/png"],
  };

  // Create stepper props here!
  const stepperContent: StepperContent[] = [
    { label: "Attach Valid Government ID", fileUploaderProps },
    { label: "Register", formProps },
  ];
  const stepperProps: CustomStepperProps = { stepperContent };

  return { stepperProps, fields };
};
