import {
  ActionButtonProps,
  ColumnSchema,
  HeaderActions,
  TableActions,
} from "@/components/Table";
import { CreateEventsDto, FindAllEventsDto } from "@/store/api/gen/event";
import { useEventsApi } from "@/store/api/hooks/event";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { IHandleSubmitType } from "../officials/hook";
import { Field, InputFieldProps } from "@/components/hooks/useModal";
import { TextareaAutosizeProps } from "@mui/material";
import { CustomDatePickerProps } from "@/components/DatePicker";
import { FormikHelpers } from "formik";
import { useSnackbar } from "@/components/hooks/useSnackbar";
import { CustomDateTimePickerProps } from "@/components/DateTimePicker";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialValues: CreateEventsDto | any = {
  eventName: "",
  description: "",
  location: "",
  eventDate: "",
};

const columns: ColumnSchema<FindAllEventsDto & TableActions>[] = [
  { key: "eventName", label: "event" },
  { key: "description", label: "description" },
  {
    key: "eventDate",
    label: "event date",
    format: (value) => moment(value).format("lll"),
  },
  { key: "location", label: "location" },
  {
    key: "createdAt",
    label: "created at",
    format: (value) => moment(value).format("MM/DD/YYYY"),
  },
  { key: "cellActions", label: "action" },
];

const modalFields: Field<
  | InputFieldProps
  | TextareaAutosizeProps
  | CustomDatePickerProps
  | CustomDateTimePickerProps
>[] = [
  {
    fieldType: "text",
    fieldProps: {
      label: "Event name",
      name: "eventName",
      id: "eventName",
      type: "text",
      margin: "dense",
    },
  },
  {
    fieldType: "textarea",
    fieldProps: <TextareaAutosizeProps>{
      id: "description",
      label: "description",
      name: "description",
      placeholder: "Enter your description",
    },
  },
  {
    fieldType: "dateTime",
    fieldProps: <CustomDateTimePickerProps>{
      label: "Select event date and time",
      name: "eventDate",
      id: "eventDate",
      margin: "dense",
    },
  },
  {
    fieldType: "text",
    fieldProps: {
      label: "location",
      name: "location",
      id: "location",
      type: "text",
      margin: "dense",
    },
  },
];

export const useHooks = () => {
  const {
    isFetchingEvents,
    events,
    handleCreate: create,
    handleUpdate: update,
  } = useEventsApi();
  const { setSnackbarProps } = useSnackbar();

  const [btnName, setBtnName] = useState<IHandleSubmitType>("Submit");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [dataSource, setDataSource] = useState<FindAllEventsDto[]>([]);
  const [formValues, setFormValues] = useState<CreateEventsDto>(initialValues);

  const handleCreate = async (
    values: CreateEventsDto,
    { setSubmitting }: FormikHelpers<CreateEventsDto>
  ) => {
    try {
      await create(values);

      setSubmitting(false);
      setOpenModal(false);
      setOpenModal((state) => !state);
      setSnackbarProps({
        message: "Events Successfully created!",
        severity: "success",
      });
    } catch (err: unknown) {
      const error = err as Error;
      setSnackbarProps({
        message: error?.message || "Something went wrong, Try again!",
        severity: "error",
      });
    }
  };

  const handleUpdate = async (
    { id, ...values }: FindAllEventsDto,
    { setSubmitting }: FormikHelpers<FindAllEventsDto>
  ) => {
    try {
      await update(id, values);

      setSubmitting(false);
      setBtnName("Submit");

      setOpenModal((state) => !state);

      setSnackbarProps({
        message: "Events successfully updated!",
        severity: "success",
      });
    } catch (err) {
      const error = err as Error;
      setSnackbarProps({ message: error.message, severity: "error" });
    }
  };
  const handleSubmit = useCallback(
    function (
      values: CreateEventsDto | FindAllEventsDto,
      formikHelpers: FormikHelpers<CreateEventsDto | FindAllEventsDto>
    ) {
      return btnName === "Submit"
        ? handleCreate(values, formikHelpers)
        : handleUpdate(
            values as FindAllEventsDto,
            formikHelpers as FormikHelpers<FindAllEventsDto>
          );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [btnName]
  );

  const handleToggleModal = (element?: FindAllEventsDto) => {
    if (element) {
      setFormValues(element);
      setBtnName("Save Changes");
    } else {
      setFormValues(initialValues);
      setBtnName("Submit");
    }

    setOpenModal((state) => !state);
  };

  const tableHeaderActions: HeaderActions<ActionButtonProps<undefined>>[] = [
    {
      actionType: "button",
      actionProps: <ActionButtonProps<undefined>>{
        name: "add event",
        handleClick: handleToggleModal,
      },
    },
  ];

  const tableCellActions: ActionButtonProps<FindAllEventsDto>[] = [
    {
      name: "Edit",
      variant: "contained",
      handleClick: handleToggleModal,
    },
  ];

  useEffect(() => {
    const updateDataEvents = async () => {
      if (events?.length) {
        setDataSource(events as FindAllEventsDto[]);
      }
    };

    updateDataEvents();
  }, [events]);

  return {
    openModal,
    btnName,
    columns,
    isFetchingEvents,
    dataSource,
    tableHeaderActions,
    initialValues: formValues,
    handleSubmit,
    fields: modalFields,
    handleToggleModal,
    tableCellActions,
  };
};
