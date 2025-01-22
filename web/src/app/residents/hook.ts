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
import { useCallback, useEffect, useState } from "react";
import { IHandleSubmitType } from "../officials/hook";
import { FormikHelpers } from "formik";
import { useSnackbar } from "@/components/hooks/useSnackbar";
import { OptionSelect, SelectFieldProps } from "@/components/Select";

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
  >(
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
          label: "confirmPassword",
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

  const handleToggleModal = (
    values?: FindAllResidentsDto & { password: string }
  ) => {
    if (values && Object.keys(values).length) {
      const mobileNumber = values.contact ? values.contact.slice(3) : "";

      //
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
      setBtnName("Submit");
      setFormValues(residentInitialValues);
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
    values: CreateResidentsDto
  ) => {
    try {
      await edit(id, {
        ...values,
        contact: `+63${values.contact}`,
      } as unknown as CreateResidentsDto);

      // Set fields
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
              label: "confirmPassword",
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

      setOpen(false);
      setSnackbarProps({ message: "Resident successfully updated!" });
    } catch (err: any) {
      console.log("err", err);

      setSnackbarProps({ message: err?.message, severity: "error" });
    }
  };

  const handleSubmit = useCallback(
    function (
      values: CreateResidentsDto | FindAllResidentsDto,
      formikHelpers: FormikHelpers<FindAllResidentsDto | CreateResidentsDto>
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
    [btnName]
  );

  useEffect(() => {
    if (residents?.length) {
      const data = residents as FindAllResidentsDto[];
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
  };
};
