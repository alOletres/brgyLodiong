/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from "@/components/hooks/useModal";
import { OptionSelect, SelectFieldProps } from "@/components/Select";
import { useResidentsApi } from "@/store/api/hooks/residents";
import { TextareaAutosizeProps } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  RequestType,
  RequestStatus,
  FindAllRequestsDto,
  CreateRequestDto,
} from "../../store/api/gen/request";
import { useRequestApi } from "@/store/api/hooks/request";
import {
  ActionButtonProps,
  ColumnSchema,
  HeaderActions,
  TableActions,
} from "@/components/Table";
import moment from "moment";
import { useSnackbar } from "@/components/hooks/useSnackbar";
import { FormikHelpers } from "formik";
import { IHandleSubmitType } from "../officials/hook";

const RequestTypeArray: RequestType[] = ["CERTIFICATE", "CLEARANCE", "PERMIT"];
const RequestStatusArray: RequestStatus[] = [
  "PENDING",
  "APPROVED",
  "COMPLETED",
  "REJECTED",
  "CLAIMED",
  "UNCLAIMED",
];

const initialValues: CreateRequestDto = {
  residentId: 0,
  requestMode: "WALKIN",
  requestType: "CERTIFICATE",
  purpose: "",
  status: "PENDING",
};

const columnSchema: ColumnSchema<FindAllRequestsDto & TableActions>[] = [
  { key: "requestedBy", label: "requested by" },
  { key: "contact", label: "contact" },
  { key: "requestType", label: "request type" },
  { key: "purpose", label: "purpose" },
  { key: "requestMode", label: "request mode" },
  {
    key: "dateRequested",
    label: "date requested",
    format: (value) => moment(value).format("MM/DD/YYYY"),
  },
  {
    key: "dateCompleted",
    label: "date completed",
    format: (value) => moment(value).format("MM/DD/YYYY"),
  },

  { key: "status", label: "status" },
  { key: "cellActions", label: "action" },
];

export const useHooks = () => {
  const { residents } = useResidentsApi();
  const {
    isFetchingRequest,
    requests,
    handleCreate: create,
    handleUpdate: edit,
  } = useRequestApi();
  const [dataSource, setDataSource] = useState<FindAllRequestsDto[]>([]);
  const [formValues, setFormValues] = useState<CreateRequestDto>(initialValues);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { setSnackbarProps } = useSnackbar();
  const [btnName, setBtnName] = useState<IHandleSubmitType>("Submit");

  const residentOptions = useMemo(
    () =>
      residents
        ?.filter((value) => value.role === "RESIDENT")
        ?.map((value): OptionSelect => {
          return {
            key: value.id,
            value: `${value.firstname} ${value.lastname}`,
          };
        }),
    [residents]
  );

  const fields: Field<SelectFieldProps | TextareaAutosizeProps>[] = [
    {
      fieldType: "select",
      fieldProps: {
        id: "residentId",
        label: "Select Resident",
        name: "residentId",
        inputLabelId: "residentId",
        labelId: "residentId",
        options: residentOptions,
        margin: "dense",
      },
    },
    {
      fieldType: "select",
      fieldProps: {
        id: "requestType",
        label: "Select Request type",
        name: "requestType",
        inputLabelId: "requestType",
        labelId: "requestType",
        options: RequestTypeArray.map((value): OptionSelect => {
          return { key: value, value };
        }),
        margin: "dense",
      },
    },
    {
      fieldType: "textarea",
      fieldProps: <TextareaAutosizeProps>{
        id: "purpose",
        label: "purpose",
        name: "purpose",
        placeholder: "Enter your purpose",
      },
    },

    {
      fieldType: "select",
      fieldProps: {
        id: "status",
        label: "Select status",
        name: "status",
        inputLabelId: "status",
        labelId: "status",
        options: RequestStatusArray.map((value): OptionSelect => {
          return { key: value, value };
        }),
      },
    },
  ];

  const handleToggleModal = (values?: FindAllRequestsDto) => {
    if (values && Object.keys(values).length) {
      setFormValues({ ...values });
      setBtnName("Save Changes");
    } else {
      setBtnName("Submit");
      setFormValues(initialValues);
    }

    setOpenModal((state) => !state);
  };

  const tableCellActions: ActionButtonProps<FindAllRequestsDto>[] = [
    {
      name: "Edit",
      variant: "contained",
      handleClick: handleToggleModal,
    },
  ];

  const tableHeaderActions: HeaderActions<ActionButtonProps<any>>[] = [
    {
      actionType: "button",
      actionProps: {
        name: "add request",
        handleClick: handleToggleModal,
      },
    },
  ];

  useEffect(() => {
    setDataSource(requests as FindAllRequestsDto[]);
  }, [requests]);

  const handleSearch = (
    event?:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | undefined
  ) => {
    if (event?.target.value) {
      const filteredSource = dataSource.filter((row) => {
        return row.requestedBy
          .toLowerCase()
          .includes(event?.target.value.toLowerCase());
      });
      setDataSource(filteredSource);
    } else {
      setDataSource(requests as FindAllRequestsDto[]);
    }
  };

  const handleEdit = async (
    {
      id,
      dateRequested,
      dateCompleted,
      requestedBy,
      address,
      contact,
      email,

      ...values
    }: FindAllRequestsDto,
    { setSubmitting }: FormikHelpers<FindAllRequestsDto>
  ) => {
    try {
      await edit(id, values);
      setSubmitting(false);
      setBtnName("Submit");
      setOpenModal(false);
      setSnackbarProps({
        message: "Request successfully updated!",
        severity: "success",
      });
    } catch (err: any) {
      console.log("err", err);
      setSnackbarProps({ message: err?.message, severity: "error" });
    }
  };

  const handleCreate = async (
    values: CreateRequestDto,
    { setSubmitting }: FormikHelpers<CreateRequestDto>
  ) => {
    try {
      await create({ ...values });
      setSubmitting(false);
      setOpenModal(false);
      setSnackbarProps({
        message: "Request successfully created!",
        severity: "success",
      });
    } catch (err: any) {
      console.log("err", err);
      setSnackbarProps({ message: err?.message, severity: "error" });
    }
  };

  const handleSubmit = useCallback(
    function (
      values: CreateRequestDto | FindAllRequestsDto,
      formik: FormikHelpers<CreateRequestDto | FindAllRequestsDto>
    ) {
      return btnName === "Submit"
        ? handleCreate(
            values as CreateRequestDto,
            formik as FormikHelpers<CreateRequestDto>
          )
        : handleEdit(
            values as FindAllRequestsDto,
            formik as FormikHelpers<FindAllRequestsDto>
          );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [btnName]
  );
  return {
    fields,
    isFetchingRequest,
    dataSource,
    initialValues: formValues,
    openModal,
    handleToggleModal,
    columnSchema,
    tableCellActions,
    tableHeaderActions,
    handleSearch,
    btnName,
    handleSubmit,
  };
};
