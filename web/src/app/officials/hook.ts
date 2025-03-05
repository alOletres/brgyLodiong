/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomDatePickerProps } from "@/components/DatePicker";
import { Field, InputFieldProps } from "@/components/hooks/useModal";
import { useSnackbar } from "@/components/hooks/useSnackbar";
import {
  ActionButtonProps,
  ColumnSchema,
  HeaderActions,
  TableActions,
} from "@/components/Table";
import {
  CreateOfficialsDto,
  FindAllOfficialsDto,
} from "@/store/api/gen/officials";
import { useOfficialsApi } from "@/store/api/hooks/officials";
import { isValidDate } from "@/utils/error";
import { FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import moment from "moment";
import { EPOSITION } from "@/constants/posistion.enum";
import { OptionSelect, SelectFieldProps } from "@/components/Select";
import { ECOMMITEE } from "@/constants/committee.enum";
import { decodeToken } from "@/lib/tokenStorage";
import { DecodedTokenValues } from "@/components/hooks/useDrawer";

export type IHandleSubmitType = "Submit" | "Save Changes";

const initialValues: CreateOfficialsDto = {
  firstname: "",
  lastname: "",
  suffix: "",
  achievements: "",
  position: "",
  committee: "",
  startTerm: "",
  endTerm: "",
};

// Set user here!

export const useHooks = () => {
  const { officials, handleCreate, handleUpdate, isFetchingOfficials } =
    useOfficialsApi();
  const { setSnackbarProps } = useSnackbar();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [btnName, setBtnName] = useState<IHandleSubmitType>("Submit");

  const [user, setUser] = useState<DecodedTokenValues>(
    {} as DecodedTokenValues
  );

  const [initialFormValues, setInitialFormValues] =
    useState<CreateOfficialsDto>(initialValues);

  const [dataSource, setDataSource] = useState<FindAllOfficialsDto[]>([]);

  const positions: OptionSelect[] = Object.values(EPOSITION).map((position) => {
    return { key: position, value: position };
  });

  const committees = Object.values(ECOMMITEE).map((committee): OptionSelect => {
    return {
      key: committee,
      value: committee,
    };
  });

  useEffect(() => {
    const decoded = decodeToken() as DecodedTokenValues;

    if (decoded) {
      setUser(decoded);
    }
  }, []);

  const officialColumnSchema: ColumnSchema<
    FindAllOfficialsDto & TableActions
  >[] = [
    { key: "committee", label: "Committee" },
    { key: "position", label: "position" },
    { key: "firstname", label: "firstname" },
    { key: "lastname", label: "lastname" },
    { key: "suffix", label: "Suffix" },
    { key: "achievements", label: "achievements" },
  ];

  const columnSchema: ColumnSchema<FindAllOfficialsDto & TableActions>[] =
    user.role === "ADMIN"
      ? officialColumnSchema.concat([
          {
            key: "startTerm",
            label: "start term",
            format: (value) => moment(value).format("MM/DD/YYYY"),
          },
          {
            key: "endTerm",
            label: "end term",
            format: (value) => moment(value).format("MM/DD/YYYY"),
          },
          {
            key: "cellActions",
            label: "actions",
          },
        ])
      : officialColumnSchema;

  const modalFields: Field<
    InputFieldProps | CustomDatePickerProps | SelectFieldProps
  >[] = [
    {
      fieldType: "text",
      fieldProps: {
        label: "Firstname",
        name: "firstname",
        id: "firstname",
        type: "text",
        margin: "dense",
      },
    },
    {
      fieldType: "text",
      fieldProps: {
        label: "Lastname",
        name: "lastname",
        id: "lastname",
        type: "text",
        margin: "dense",
      },
    },

    {
      fieldType: "text",
      fieldProps: {
        label: "Suffix (Optional)",
        name: "suffix",
        id: "suffix",
        type: "text",
        margin: "dense",
      },
    },

    {
      fieldType: "select",
      fieldProps: <SelectFieldProps>{
        id: "position",
        name: "position",
        label: "Select position",
        inputLabelId: "position",
        labelId: "position",
        options: positions,
        margin: "dense",
      },
    },
    {
      fieldType: "select",
      fieldProps: <SelectFieldProps>{
        id: "committee",
        name: "committee",
        label: "Select committee",
        inputLabelId: "committee",
        labelId: "committee",
        options: committees,
        margin: "dense",
      },
    },
    {
      fieldType: "text",
      fieldProps: {
        label: "Achievements",
        name: "achievements",
        id: "achievements",
        type: "text",
        margin: "dense",
      },
    },
    {
      fieldType: "date",
      fieldProps: {
        label: "StartTerm",
        name: "startTerm",
        id: "startTerm",
        type: "text",
        margin: "dense",
      },
    },
    {
      fieldType: "date",
      fieldProps: {
        label: "EndTerm (Optional)",
        name: "endTerm",
        id: "endTerm",
        type: "text",
        margin: "dense",
      },
    },
  ];

  const handleSubmit = async (
    { endTerm, ...values }: CreateOfficialsDto,
    { setSubmitting }: FormikHelpers<CreateOfficialsDto>
  ) => {
    try {
      const isDate = isValidDate(endTerm?.toString() as string);

      if (btnName === "Submit") {
        await handleCreate({
          ...values,
          endTerm: isDate ? endTerm : undefined,
        });
      } else {
        const { id, ...payload } = values as CreateOfficialsDto & {
          id: number;
        };

        console.log("values", id);

        await handleUpdate(id, {
          ...payload,
          endTerm: isDate ? endTerm : undefined,
        });

        setBtnName("Submit");
      }
      setSnackbarProps({
        message: `Official successfully ${
          btnName === "Submit" ? "created" : "updated"
        }!`,
        severity: "success",
      });
      setSubmitting(true);
      setInitialFormValues(initialValues);
      setOpenModal(false);

      setBtnName("Submit");
    } catch (err: any) {
      setSnackbarProps({
        message: err?.message || "Something went wrong, Try again!",
        severity: "error",
      });
    }
  };

  const handleToggleModal = (values?: FindAllOfficialsDto) => {
    if (!values) {
      setInitialFormValues(initialValues);
    } else {
      const { startTerm, endTerm, ...payload } = values;

      const isDate = isValidDate(endTerm?.toString() as string);

      setInitialFormValues({
        ...payload,
        startTerm: moment(startTerm).format("YYYY-MM-DD"),
        endTerm: isDate ? moment(endTerm).format("YYYY-MM-DD") : null,
      } as unknown as CreateOfficialsDto);

      setBtnName("Save Changes");
    }

    setOpenModal((state) => !state);
  };

  const tableHeaderActions: HeaderActions<ActionButtonProps<any>>[] = [
    {
      actionType: "button",
      actionProps: {
        name: "Add Official",
        variant: "contained",
        handleClick: handleToggleModal,
      },
    },
  ];

  const tableCellActions: ActionButtonProps<FindAllOfficialsDto>[] = [
    {
      name: "Edit",
      variant: "contained",
      handleClick: handleToggleModal,
    },
  ];

  useEffect(() => {
    setDataSource(officials as FindAllOfficialsDto[]);
  }, [officials]);

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
      setDataSource(officials as FindAllOfficialsDto[]);
    }
  };

  return {
    columnSchema,
    dataSource,
    tableHeaderActions: user?.role === "ADMIN" ? tableHeaderActions : undefined,
    handleToggleModal,
    openModal,
    modalFields,
    handleSubmit,
    initialValues: initialFormValues,
    btnName,
    tableCellActions,
    handleSearch,
    isFetchingOfficials,
  };
};
