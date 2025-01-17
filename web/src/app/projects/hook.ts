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
import { ProjectStatus } from "@/store/api/gen/officials";

export const useHooks = () => {
  const initialFormValues: any = {
    officialId: 0,
    position: "",
    members: [],
    projectName: "",
    description: "",
    startDate: "",
    status: "PENDING",
  };

  const projectStatus: ProjectStatus[] = ["PENDING", "SUCCEED"];

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
  const [members, setMembers] = useState<OptionSelect[]>([]);

  const columnSchema: ColumnSchema<FindAllProjectsDto & TableActions>[] = [
    { key: "officialName", label: "Official" },
    { key: "members", label: "members" },
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
      key: "status",
      label: "status",
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

      if (officials?.length) {
        setMembers(
          officials
            .filter((value) => value.id !== values.officialId)
            .map((value) => {
              return {
                key: value.id,
                value: `${value.firstname} ${value.lastname}`,
              };
            })
        );

        const findOfficial = officials.find(
          (value) => value.id === values.officialId
        );

        setFormValues({
          ...values,
          position: findOfficial?.position,
          endDate: isDate ? endDate : undefined,
        } as any);
      }

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
        name: "Add Project",
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
        label: "Select project leader",
        inputLabelId: "officialId",
        labelId: "officialId",
        options: optionsOfficials,
        margin: "dense",
        handleSelectChange: (id) => {
          if (officials?.length) {
            // Get the members if not selected as a project leader official

            const filteredOfficials = officials
              .filter((value) => value.id !== id)
              .map((value) => {
                return {
                  key: value.id,
                  value: `${value.firstname} ${value.lastname}`,
                };
              });

            setMembers(filteredOfficials);

            //
            const findOfficial = officials.find((value) => value.id === id);

            if (findOfficial) {
              const { position } = findOfficial;

              return {
                propertyName: "position",
                value: position,
              };
            }
          }
        },
      },
    },
    {
      fieldType: "textarea",
      fieldProps: <InputFieldProps>{
        label: "Position",
        name: "position",
        id: "position",
        type: "text",
        margin: "dense",
        disabled: true,
      },
    },
    {
      fieldType: "select",
      fieldProps: <SelectFieldProps>{
        id: "members",
        name: "members",
        label: "Select members",
        inputLabelId: "members",
        labelId: "members",
        options: members,
        margin: "dense",
        multiple: true,
      },
    },
    {
      fieldType: "text",
      fieldProps: <InputFieldProps>{
        label: "Project title",
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

    {
      fieldType: "select",
      fieldProps: <SelectFieldProps>{
        id: "status",
        name: "status",
        label: "Select status",
        inputLabelId: "status",
        labelId: "status",
        options: projectStatus.map((status): OptionSelect => {
          return { key: status, value: status };
        }),
        margin: "dense",
      },
    },
  ];

  const handleCreate = async (
    { endDate, members, ...values }: CreateProjectsDto,
    { setSubmitting }: FormikHelpers<CreateProjectsDto>
  ) => {
    try {
      const isDate = isValidDate(endDate?.toString() as string);
      await create({
        ...values,
        endDate: isDate ? endDate : undefined,
        members: JSON.stringify(members),
      });

      setSubmitting(false);
      setBtnName("Submit");
      setOpenModal(false);

      setSnackbarProps({
        message: "Projects successfully created!",
        severity: "success",
      });
    } catch (err: any) {
      console.log("err", err);

      setSnackbarProps({ message: err?.message, severity: "error" });
    }
  };

  const handleUpdate = async (
    { id, endDate, members, ...values }: FindAllProjectsDto,
    { setSubmitting }: FormikHelpers<FindAllProjectsDto>
  ) => {
    try {
      const isDate = isValidDate(endDate?.toString() as string);

      const filteredMembers = (members as unknown as OptionSelect[]).filter(
        (value) => value
      );
      await update(id, {
        ...values,
        endDate: isDate ? endDate : undefined,
        members: JSON.stringify(filteredMembers),
      });
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
    const data = projects as FindAllProjectsDto[];

    if (data?.length) {
      const sanitizeData = structuredClone(data).map((value) => {
        if (typeof value.members === "string") {
          value.members = JSON.parse(value.members);
        }
        return value;
      });

      setDataSource(sanitizeData);
    }
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
