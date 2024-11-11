/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { CustomDatePickerProps } from "@/components/DatePicker";
import { Field, InputFieldProps } from "@/components/hooks/useModal";
import { OptionSelect, SelectFieldProps } from "@/components/Select";
import {
  ActionButtonProps,
  ColumnSchema,
  HeaderActions,
  TableActions,
} from "@/components/Table";
import {
  CreateProjectsDto,
  FindAllProjectsDto,
} from "@/store/api/gen/projects";
import { useOfficialsApi } from "@/store/api/hooks/officials";
import { useProjectsApi } from "@/store/api/hooks/projects";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IHandleSubmitType } from "../officials/hook";
import { FormikHelpers } from "formik";
import { useSnackbar } from "@/components/hooks/useSnackbar";
import { isValidDate } from "@/utils/error";

export const useHooks = () => {
  const initialFormValues: CreateProjectsDto = {
    officialId: 0,
    projectName: "",
    description: "",
    startDate: "",
  };

  const {
    projects,
    isFetchingProjects,
    handleCreate: create,
    handleUpdate: update,
  } = useProjectsApi();
  const { officials } = useOfficialsApi();
  const { setSnackbarProps } = useSnackbar();

  const [dataSource, setDataSource] = useState<FindAllProjectsDto[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [btnName, setBtnName] = useState<IHandleSubmitType>("Submit");
  const [formValues, setFormValues] =
    useState<CreateProjectsDto>(initialFormValues);

  const columnSchema: ColumnSchema<FindAllProjectsDto & TableActions>[] = [
    { key: "officialName", label: "Official" },
    { key: "projectName", label: "project" },
    { key: "description", label: "description" },
    {
      key: "startDate",
      label: "start date",
      format: (value) => moment(value).format("MM/DD/YYYY"),
    },
    {
      key: "endDate",
      label: "end date",
      format: (value) => moment(value).format("MM/DD/YYYY"),
    },
    {
      key: "cellActions",
      label: "actions",
    },
  ];

  const handleToggleModal = (values?: FindAllProjectsDto) => {
    if (values && Object.keys(values).length) {
      const { endDate } = values;

      const isDate = isValidDate(endDate?.toString() as string);
      setFormValues({ ...values, endDate: isDate ? endDate : undefined });

      setBtnName("Save Changes");
    } else {
      setFormValues({ ...initialFormValues });

      setBtnName("Submit");
    }
    setOpenModal((state) => !state);
  };

  const headerActions: HeaderActions<ActionButtonProps<any>>[] = [
    {
      actionType: "button",
      actionProps: {
        name: "add project",
        variant: "contained",
        handleClick: handleToggleModal,
      },
    },
  ];

  const tableCellActions: ActionButtonProps<FindAllProjectsDto>[] = [
    {
      name: "Edit",
      variant: "contained",
      handleClick: handleToggleModal,
    },
  ];

  const optionsOfficials = useMemo(
    () =>
      officials?.map((value): OptionSelect => {
        return { key: value.id, value: `${value.firstname} ${value.lastname}` };
      }),
    [officials]
  );

  const fields: Field<
    InputFieldProps | CustomDatePickerProps | SelectFieldProps
  >[] = [
    {
      fieldType: "select",
      fieldProps: <SelectFieldProps>{
        id: "officialId",
        name: "officialId",
        label: "Select Official",
        inputLabelId: "officialId",
        labelId: "officialId",
        options: optionsOfficials,
        margin: "dense",
      },
    },
    {
      fieldType: "text",
      fieldProps: <InputFieldProps>{
        label: "Project name",
        name: "projectName",
        id: "projectName",
        type: "text",
        margin: "dense",
      },
    },
    {
      fieldType: "text",
      fieldProps: <InputFieldProps>{
        label: "Description",
        name: "description",
        id: "description",
        type: "text",
        margin: "dense",
      },
    },
    {
      fieldType: "date",
      fieldProps: <CustomDatePickerProps>{
        label: "Select start date",
        name: "startDate",
      },
    },
    {
      fieldType: "date",
      fieldProps: <CustomDatePickerProps>{
        label: "Select end date (Optional)",
        name: "endDate",
      },
    },
  ];

  const handleCreate = async (
    { endDate, ...values }: CreateProjectsDto,
    { setSubmitting }: FormikHelpers<CreateProjectsDto>
  ) => {
    try {
      const isDate = isValidDate(endDate?.toString() as string);
      await create({ ...values, endDate: isDate ? endDate : undefined });

      setSubmitting(false);
      setBtnName("Submit");
      setOpenModal(false);

      setSnackbarProps({
        message: "Projects successfully created!",
        severity: "success",
      });
    } catch (err: any) {
      setSnackbarProps({ message: err?.message, severity: "error" });
    }
  };

  const handleUpdate = async (
    { id, endDate, ...values }: FindAllProjectsDto,
    { setSubmitting }: FormikHelpers<FindAllProjectsDto>
  ) => {
    try {
      const isDate = isValidDate(endDate?.toString() as string);
      await update(id, { ...values, endDate: isDate ? endDate : undefined });
      setSubmitting(false);
      setBtnName("Submit");
      setOpenModal(false);

      setSnackbarProps({
        message: "Project successfully updated!",
        severity: "success",
      });
    } catch (err: any) {
      setSnackbarProps({ message: err?.message, severity: "error" });
    }
  };

  const handleSubmit = useCallback(
    function (
      formValues: CreateProjectsDto | FindAllProjectsDto,
      formActions: FormikHelpers<CreateProjectsDto | FindAllProjectsDto>
    ) {
      return btnName === "Submit"
        ? handleCreate(formValues, formActions)
        : handleUpdate(
            formValues as FindAllProjectsDto,
            formActions as FormikHelpers<FindAllProjectsDto>
          );
    },
    [btnName]
  );

  useEffect(() => {
    setDataSource(projects as FindAllProjectsDto[]);
  }, [projects]);

  const handleSearch = (
    event?:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | undefined
  ) => {
    if (event?.target.value) {
      const filteredSource = dataSource.filter((row) => {
        return row.projectName
          .toLowerCase()
          .includes(event?.target.value.toLowerCase());
      });
      setDataSource(filteredSource);
    } else {
      setDataSource(projects as FindAllProjectsDto[]);
    }
  };

  return {
    dataSource,
    columnSchema,
    headerActions,
    isFetchingProjects,
    initialValues: formValues,
    handleToggleModal,
    openModal,
    fields,
    handleSubmit,
    btnName,
    tableCellActions,
    handleSearch,
  };
};
