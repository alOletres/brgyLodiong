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
  CreateResidentsDto,
  FindAllResidentsDto,
} from "@/store/api/gen/residents";
import { useResidentsApi } from "@/store/api/hooks/residents";
import { TextareaAutosizeProps } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { IHandleSubmitType } from "../officials/hook";
import { FormikHelpers } from "formik";
import { useSnackbar } from "@/components/hooks/useSnackbar";

const initialValues: CreateResidentsDto = {
  firstname: "",
  lastname: "",
  email: "",
  contact: "",
  address: "",
  role: "RESIDENT",
  password: "",
};

const columnSchema: ColumnSchema<
  FindAllResidentsDto & { password: string } & TableActions
>[] = [
  { key: "firstname", label: "firstname" },
  { key: "lastname", label: "lastname" },
  { key: "email", label: "email" },
  { key: "contact", label: "contact" },
  { key: "address", label: "address" },
  { key: "cellActions", label: "action" },
];

const fields: Field<CustomInputProps | TextareaAutosizeProps>[] = [
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
    fieldType: "text",
    fieldProps: {
      id: "email  ",
      name: "email",
      label: "Email",
      type: "text",
      margin: "dense",
    },
  },
  {
    fieldType: "text",
    fieldProps: {
      id: "contact  ",
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
  const [formValues, setFormValues] =
    useState<CreateResidentsDto>(initialValues);
  const [btnName, setBtnName] = useState<IHandleSubmitType>("Submit");

  const handleToggleModal = (
    values?: FindAllResidentsDto & { password: string }
  ) => {
    if (values && Object.keys(values).length) {
      setBtnName("Save Changes");
      setFormValues({ ...values, password: values.password });
    } else {
      setBtnName("Submit");
      setFormValues(initialValues);
    }
    setOpen((state) => !state);
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
      await create({ ...values });
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
    { id, ...values }: FindAllResidentsDto,
    { resetForm, setSubmitting }: FormikHelpers<FindAllResidentsDto>
  ) => {
    try {
      await edit(id, values as unknown as CreateResidentsDto);
      setSubmitting(false);
      resetForm();
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
            values as FindAllResidentsDto,
            formikHelpers as FormikHelpers<FindAllResidentsDto>
          );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [btnName]
  );

  useEffect(() => {
    setDataSource(residents as FindAllResidentsDto[]);
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
    fields,
    btnName,
    handleSearch,
  };
};
