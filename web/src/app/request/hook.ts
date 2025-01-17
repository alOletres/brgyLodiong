/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from "@/components/hooks/useModal";
import { OptionSelect, SelectFieldProps } from "@/components/Select";
import { useResidentsApi } from "@/store/api/hooks/residents";
import { TextareaAutosizeProps } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
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
import { ECERTIFICATES } from "@/constants/certificates.enum";
import { exportToPdf, IParagraph } from "@/lib/pdfMake";
import { decodeToken } from "@/lib/tokenStorage";
import { DecodedTokenValues } from "@/components/hooks/useDrawer";
import { useOfficialsApi } from "@/store/api/hooks/officials";
import { FindAllOfficialsDto } from "@/store/api/gen/officials";
import { CustomInputProps } from "@/components/TextFieldInput";

export const RequestTypeArray: string[] = Object.values(ECERTIFICATES).sort(
  (a, b) => (a > b ? 1 : -1)
);
export const RequestStatusArray: RequestStatus[] = [
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
  requestType: "",
  purpose: "",
  status: "PENDING",
};

const initialRejectionValues = { rejectionReason: "" };

export const requestColumnSchema: ColumnSchema<FindAllRequestsDto>[] = [
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

  { key: "rejectionReason", label: "rejection reason" },
];

export const useHooks = () => {
  const { residents } = useResidentsApi();
  const {
    isFetchingRequest,
    requests,
    handleCreate: create,
    handleUpdate: edit,
  } = useRequestApi();
  const { officials } = useOfficialsApi();

  const [dataSource, setDataSource] = useState<FindAllRequestsDto[]>([]);
  const [formValues, setFormValues] = useState<CreateRequestDto>(initialValues);
  const [initialResidentRequestForm, setInitialResidentRequestForm] = useState<
    Pick<CreateRequestDto, "requestType" | "purpose">
  >({ requestType: "", purpose: "" });

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [rejectionOpenModal, setRejectionOpenModal] = useState<boolean>(false);
  const { setSnackbarProps } = useSnackbar();
  const [btnName, setBtnName] = useState<IHandleSubmitType>("Submit");

  const [requestUpdate, setRequestUpdate] = useState<
    CreateRequestDto & { id: number }
  >();
  const [user, setUser] = useState<DecodedTokenValues>(
    {} as DecodedTokenValues
  );
  const [isShowDialog, setShowDialog] = useState<boolean>(false);

  const dataOfficials = useMemo(
    (): FindAllOfficialsDto[] => (officials?.length ? officials : []),
    [officials]
  );

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

  useEffect(() => {
    const decoded = decodeToken() as DecodedTokenValues;

    if (decoded) {
      // Set user here!

      setUser(decoded);
    }
  }, []);

  const columnSchema: ColumnSchema<FindAllRequestsDto & TableActions>[] =
    user?.role === "ADMIN"
      ? [...requestColumnSchema, { key: "cellActions", label: "action" }]
      : [...requestColumnSchema];

  const rejectionField: Field<CustomInputProps>[] = [
    {
      fieldType: "text",
      fieldProps: {
        label: "Enter your reason here",
        name: "rejectionReason",
        id: "rejectionReason",
        type: "text",
        margin: "dense",
      },
    },
  ];

  const fields: Field<SelectFieldProps | TextareaAutosizeProps>[] =
    user?.role === "RESIDENT"
      ? [
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
        ]
      : [
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

  const handlePrintCertificate = (values?: FindAllRequestsDto) => {
    if (values) {
      exportToPdf({
        pfdFor: "paragraph",
        officials: dataOfficials,
        data: {
          type: values.requestType,
          pageContent: values,
        } as IParagraph,
      });
    }
  };

  const tableCellActions: ActionButtonProps<FindAllRequestsDto>[] = [
    {
      name: "Edit",
      variant: "contained",
      handleClick: handleToggleModal,
    },
    {
      name: "Print Certificate",
      variant: "outlined",
      handleClick: handlePrintCertificate,
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
    const data = requests as FindAllRequestsDto[];
    if (data?.length) {
      if (user?.role === "RESIDENT") {
        setDataSource(
          data.filter((request) => request.requestedId === user.resident.id)
        );
      } else {
        setDataSource(data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleToggleDialog = () => setShowDialog((state) => !state);

  const handleToggleRejectionModal = () =>
    setRejectionOpenModal((state) => !state);

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
    const user = decodeToken() as DecodedTokenValues;
    if (user.role === "ADMIN") {
      if (values.status === "REJECTED") {
        setRequestUpdate({ ...values, id });

        handleToggleDialog();
      } else {
        await handleUpdateRequest(id, values);
        setSubmitting(false);
      }
    }

    if (user.role === "RESIDENT") {
      const residentId = user.resident.id;

      await handleUpdateRequest(id, { ...values, residentId });
      setSubmitting(false);
    }
  };

  const handleSubmitRejectionReason = async (
    { rejectionReason }: { rejectionReason: string },
    { setSubmitting }: FormikHelpers<FindAllRequestsDto>
  ) => {
    const { id, ...payload } = {
      ...requestUpdate,
      rejectionReason,
    } as CreateRequestDto & { id: number };

    await handleUpdateRequest(id, payload);
    handleToggleRejectionModal();
    setSubmitting(false);
  };

  const handleConfirmDialog = () => {
    handleToggleDialog(); // dialog close
    setOpenModal(false); // First modal close

    handleToggleRejectionModal(); // open rejection dialog
  };

  const handleUpdateRequest = async (id: number, payload: CreateRequestDto) => {
    try {
      await edit(id, payload);

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
      const user = decodeToken() as DecodedTokenValues;

      if (user.role === "RESIDENT") {
        const residentId = user.resident.id;

        const payload = { ...values, residentId };

        console.log("payload", payload);

        await create({ ...values, residentId });
      } else {
        await create({ ...values });
      }

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
    initialValues:
      user.role === "RESIDENT" ? initialResidentRequestForm : formValues,
    openModal,
    handleToggleModal,
    columnSchema,
    tableCellActions,
    tableHeaderActions,
    handleSearch,
    btnName,
    handleSubmit,
    user,
    isShowDialog,
    handleToggleDialog,
    handleConfirmDialog,
    rejectionField,
    handleToggleRejectionModal,
    initialRejectionValues,
    rejectionOpenModal,
    handleSubmitRejectionReason,
  };
};
