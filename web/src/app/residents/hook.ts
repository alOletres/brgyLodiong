/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from "@/components/hooks/useModal";
import {
  ActionButtonProps,
  ColumnSchema,
  HeaderActions,
  TableActions,
} from "@/components/Table";
import { CustomInputProps } from "@/components/TextFieldInput";
import {
  CivilStatus,
  CreateResidentsDto,
  FindAllResidentsDto,
  ResidentStatus,
} from "@/store/api/gen/residents";
import { useResidentsApi } from "@/store/api/hooks/residents";
import { TextareaAutosizeProps } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IHandleSubmitType } from "../officials/hook";
import { FormikHelpers } from "formik";
import { useSnackbar } from "@/components/hooks/useSnackbar";
import { OptionSelect, SelectFieldProps } from "@/components/Select";
import { CustomStepperProps, StepperContent } from "@/components/Stepper";
import { ResidentSchema, residentUpdateSchema } from "@/schema";
import { FileUploadProps } from "@/components/fileUploader";
import { CustomFormGroupProps } from "@/components/FormGroup";
import { convertUrlToFile } from "@/utils/convertFilet";
import { useSelector } from "react-redux";
import { selectImage } from "@/store/slice/image.slice";

export const residentInitialValues: CreateResidentsDto = {
  firstname: "",
  lastname: "",
  email: "",
  contact: "",
  address: "",
  role: "RESIDENT",
  password: "",
  civilStatus: "SINGLE",
  status: "PENDING",
};

export const civilStatusArray: CivilStatus[] = ["SINGLE", "MARRIED", "WIDOW"];

const residentStatus: ResidentStatus[] = ["PENDING", "REGISTERED"];

const columnSchema: ColumnSchema<
  FindAllResidentsDto & { password: string } & TableActions
>[] = [
  { key: "image", label: "Valid ID" },
  { key: "firstname", label: "firstname" },
  { key: "lastname", label: "lastname" },
  { key: "civilStatus", label: "civil status" },
  { key: "email", label: "email" },
  { key: "contact", label: "contact" },
  { key: "address", label: "address" },
  { key: "status", label: "status" },
  { key: "disApprovedReason", label: "Disapprove reason" },
  { key: "cellActions", label: "action" },
];

export const useHooks = () => {
  const {
    isFetchingResidents,
    residents,
    handleCreate: create,
    handleEdit: edit,
  } = useResidentsApi();

  const { setSnackbarProps } = useSnackbar();

  const [dataSource, setDataSource] = useState<FindAllResidentsDto[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<CreateResidentsDto>(
    residentInitialValues
  );
  const [btnName, setBtnName] = useState<IHandleSubmitType>("Submit");
  const [residentUpdateValues, setResidentUpdateValues] = useState<
    CreateResidentsDto & { id: number }
  >();

  const [isShowDialog, setShowDialog] = useState<boolean>(false);
  const [rejectionOpenModal, setRejectionOpenModal] = useState<boolean>(false);

  const [files, setFiles] = useState<File[]>([]);

  const [imageFile, setImage] = useState<File[]>(files);

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
  ];

  const [residentFields, setResidentFields] = useState<
    Field<SelectFieldProps | CustomInputProps | TextareaAutosizeProps>[]
  >([]);

  const initialRejectionValues = { disApprovedReason: "" };

  const rejectionField: Field<CustomInputProps>[] = [
    {
      fieldType: "text",
      fieldProps: {
        label: "Enter your reason here",
        name: "disApprovedReason",
        id: "disApprovedReason",
        type: "text",
        margin: "dense",
      },
    },
  ];

  const handleToggleModal = async (
    values?: FindAllResidentsDto & { password: string }
  ) => {
    if (values && Object.keys(values).length) {
      const mobileNumber = values.contact ? values.contact.slice(3) : "";

      // Preserve the uploaded image if already present
      if (values.image && files.length === 0) {
        const [_, mimeType] = values.image?.split(".");
        const image = await convertUrlToFile(
          `${process.env.NEXT_PUBLIC_API_ORIGIN}/uploads/${values.image}`,
          values.image,
          mimeType
        );

        setFiles([image]);
      }

      setResidentFields(
        [...fields].concat({
          fieldType: "select",
          fieldProps: <SelectFieldProps>{
            id: "status",
            label: "Select status",
            name: "status",
            inputLabelId: "status",
            labelId: "status",
            options:
              btnName === "Submit"
                ? residentStatus.map((value): OptionSelect => {
                    return { key: value, value };
                  })
                : residentStatus
                    .concat("DISAPPROVED")
                    .map((value): OptionSelect => {
                      return { key: value, value };
                    }),

            margin: "dense",
          },
        })
      );

      const { password: _, ...intialValues } = values;

      setFormValues({ ...intialValues, contact: mobileNumber } as any);

      setBtnName("Save Changes");
    } else {
      setFiles([]);
      setBtnName("Submit");
      setFormValues(residentInitialValues);

      setResidentFields(
        [...fields].concat([
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

          {
            fieldType: "select",
            fieldProps: <SelectFieldProps>{
              id: "status",
              label: "Select status",
              name: "status",
              inputLabelId: "status",
              labelId: "status",
              options:
                btnName === "Submit"
                  ? residentStatus.map((value): OptionSelect => {
                      return { key: value, value };
                    })
                  : residentStatus
                      .concat("DISAPPROVED")
                      .map((value): OptionSelect => {
                        return { key: value, value };
                      }),

              margin: "dense",
            },
          },
        ])
      );
    }
    setOpen((state) => !state);
  };

  const handleToggleDialog = () => setShowDialog((state) => !state);

  const handleToggleRejectionModal = () =>
    setRejectionOpenModal((state) => !state);

  const handleConfirmDialog = () => {
    handleToggleDialog(); // dialog close
    setOpen(false); // First modal close

    handleToggleRejectionModal(); // open rejection dialog
  };
  const tableHeaderActions: HeaderActions<ActionButtonProps<any>>[] = [
    {
      actionType: "button",
      actionProps: {
        name: "Add Residents",
        handleClick: handleToggleModal,
      },
    },
  ];

  const tableCellActions: ActionButtonProps<
    FindAllResidentsDto & { password: string }
  >[] = [
    {
      name: "Edit",
      variant: "contained",
      handleClick: handleToggleModal,
    },
  ];

  const handleCreate = async (
    values: CreateResidentsDto,
    { resetForm, setSubmitting }: FormikHelpers<CreateResidentsDto>
  ) => {
    const payload = {
      ...values,
      contact: `+63${values.contact}`,
    };

    try {
      const formData = new FormData();

      console.log("Create image file", files);

      if (files?.length) {
        formData.append("image", files[0] as unknown as Blob);
      }

      for (const element of Object.keys(payload)) {
        const key = element as keyof CreateResidentsDto;
        if (payload[key]) {
          formData.append(key, payload[key]);
        }
      }

      await create(formData);
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
  const handleUpdate = async (
    { id, ...values }: CreateResidentsDto & { id: number },
    { resetForm, setSubmitting }: FormikHelpers<CreateResidentsDto>
  ) => {
    if (values.status === "DISAPPROVED") {
      handleToggleDialog();
      setResidentUpdateValues({ ...values, id } as CreateResidentsDto & {
        id: number;
      });
    } else {
      await handleUpdateResidents(id, values as unknown as CreateResidentsDto);
    }

    setSubmitting(false);
    resetForm();
  };

  const handleSubmitDisApproveReason = async (
    { disApprovedReason }: Pick<FindAllResidentsDto, "disApprovedReason">,
    {
      setSubmitting,
    }: FormikHelpers<Pick<FindAllResidentsDto, "disApprovedReason">>
  ) => {
    const { id, ...payload } = {
      ...residentUpdateValues,
      disApprovedReason,
    } as CreateResidentsDto & { id: number };

    await handleUpdateResidents(id, payload);
    handleToggleRejectionModal();
    setSubmitting(false);
  };

  const handleUpdateResidents = async (
    id: number,
    { image, ...values }: CreateResidentsDto
  ) => {
    try {
      const payload = {
        ...values,
        contact: `+63${values.contact}`,
      };

      console.log("image files", files);

      const formData = new FormData();

      if (files?.length) {
        formData.append("image", files[0] as unknown as Blob);
      }

      for (const element of Object.keys(payload)) {
        const key = element as keyof Omit<CreateResidentsDto, "image">;
        if (payload[key]) {
          formData.append(key, payload[key]);
        }
      }

      await edit(id, formData);

      setOpen(false);
      setBtnName("Submit");
      setSnackbarProps({ message: "Resident successfully updated!" });
    } catch (err: any) {
      console.log("err", err);

      setSnackbarProps({ message: err?.message, severity: "error" });
    }
  };

  // Handle file changes
  const handleFileChange = (files: File[]) => {
    setFiles(files);
  };

  const handleSubmit = useCallback(
    function (
      values: CreateResidentsDto | FindAllResidentsDto,
      formikHelpers?: FormikHelpers<FindAllResidentsDto | CreateResidentsDto>
    ) {
      return btnName === "Submit"
        ? handleCreate(
            values as CreateResidentsDto,
            formikHelpers as FormikHelpers<CreateResidentsDto>
          )
        : handleUpdate(
            values as CreateResidentsDto & { id: number },
            formikHelpers as FormikHelpers<CreateResidentsDto>
          );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [btnName, files]
  );

  const formProps: CustomFormGroupProps = {
    initialValues: formValues,
    validationSchema:
      btnName === "Submit" ? ResidentSchema : residentUpdateSchema,
    fields: residentFields,
    handleSubmit,
    onFinish: handleSubmit,
  };

  const fileUploaderProps: FileUploadProps = {
    onChange: handleFileChange,
    value: files,
    handleSubmit: () => console.log("Upload images"),
    multiple: false,
    accept: ["image/jpeg", "image/png"],
  };

  // Create stepper props here!
  const stepperContent: StepperContent[] = [
    { label: "Attach Valid Government ID", fileUploaderProps },
    { label: "Register", formProps },
  ];

  const stepperProps: CustomStepperProps = { stepperContent };

  useEffect(() => {
    if (residents?.length) {
      const data = residents;
      const filteredResidents = data?.filter(
        (value) => value.role === "RESIDENT"
      );
      setDataSource(filteredResidents || []);
    }
  }, [residents]);

  const handleSearch = (
    event?:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | undefined
  ) => {
    if (event?.target.value) {
      const filteredSource = dataSource.filter((row) => {
        return row.firstname
          .toLowerCase()
          .includes(event?.target.value.toLowerCase());
      });
      setDataSource(filteredSource);
    } else {
      setDataSource(residents as FindAllResidentsDto[]);
    }
  };

  return {
    isFetchingResidents,
    dataSource,
    open,
    handleToggleModal,
    columnSchema,
    tableHeaderActions,
    tableCellActions,
    initialValues: formValues,
    handleSubmit,
    fields: residentFields,
    btnName,
    handleSearch,
    isShowDialog,
    handleToggleRejectionModal,
    rejectionOpenModal,
    handleToggleDialog,
    handleConfirmDialog,
    rejectionField,
    initialRejectionValues,
    handleSubmitDisApproveReason,
    stepperProps,
  };
};
