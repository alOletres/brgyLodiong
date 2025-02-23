/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Modal,
  Button,
  Theme,
  SxProps,
  Typography,
  ModalProps,
  TextareaAutosizeProps,
} from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { AnyObject, Maybe, ObjectSchema } from "yup";
import { CustomInput as Input } from "./TextFieldInput";
import TextArea from "./TextArea";
import Select, { SelectFieldProps } from "./Select";
import Table, { CustomTableProps } from "@/components/Table";
import {
  Field,
  InputFieldProps,
  useHook as useModalHook,
} from "./hooks/useModal";
import { memo } from "react";
import DatePicker, { CustomDatePickerProps } from "./DatePicker";
import CustomDateTimePicker, {
  CustomDateTimePickerProps,
} from "./DateTimePicker";
import CustomFileUpload, { FileUploadProps } from "./fileUploader";
import FormGroup from "./FormGroup";
import CustomStepper, { CustomStepperProps } from "./Stepper";

const contentWrapperStyle: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "90vh", // Set a maximum height
  backgroundColor: "background.paper",
  border: "1px solid gray",
  boxShadow: "24",
  p: 4,
  overflow: "auto",
};

export const saveButtonWrapper: SxProps<Theme> = {
  width: "100%",
  display: "flex",
  justifyContent: "end",
  marginTop: 1,
  gap: 2,
};

/**
 * If modal will render a form
 * @initialValues form initial values
 * @validationSchema this is optional, yup schema for form fields
 * @handleSubmit method that will be triggered when the form is submitted
 * @fields Array of {@link Field} prop
 */
export interface ModalFormProps<T extends Maybe<AnyObject>> {
  initialValues: T;
  validationSchema?: ObjectSchema<T>;
  handleSubmit: (values: T, helpers: FormikHelpers<T>) => void;
  fields: Field<
    | InputFieldProps
    | SelectFieldProps
    | TextareaAutosizeProps
    | CustomDatePickerProps
    | CustomDateTimePickerProps
  >[];
}

/**
 * If modal will render a list
 *
 */
interface ModalListProps extends CustomTableProps {}

/**
 * Modal properties
 * @handleClose a function that handles the closing of the modal
 * @open controls the modal state (open/close)
 */
interface Props<T extends Maybe<AnyObject>> extends Partial<ModalProps> {
  handleClose: () => void;
  formProps?: ModalFormProps<T>;
  listProps?: ModalListProps;
  fileUploaderProps?: FileUploadProps;
  stepperProps?: CustomStepperProps;
  open: boolean;
  title: string;
  btnName?: string;
  modalFor?: "form" | "list" | "fileUploader" | "stepper";
  width?: number;
}

const CustomModal = ({
  handleClose,
  open,
  formProps,
  listProps,
  fileUploaderProps,
  stepperProps,
  title,
  btnName = "Save",
  modalFor = "form",
  width,
  ...props
}: Props<any>) => {
  return (
    <Modal keepMounted open={open} onClose={handleClose} {...props}>
      <Box
        sx={{
          ...contentWrapperStyle,
          width,
        }}
      >
        <Box>
          <Typography variant="h6">{title}</Typography>
        </Box>
        {modalFor === "form" && formProps ? (
          <FormGroup {...formProps} btnName={btnName} />
        ) : modalFor === "list" && listProps ? (
          <Box sx={{ width: "100%", alignItems: "center" }}>
            <Table
              columns={listProps.columns}
              dataSource={listProps.dataSource}
              tableHeader={listProps.tableHeader}
              cellActions={listProps.cellActions}
              headerActions={listProps.headerActions}
            />
          </Box>
        ) : modalFor === "fileUploader" && fileUploaderProps ? (
          <CustomFileUpload {...fileUploaderProps} />
        ) : modalFor === "stepper" && stepperProps ? (
          <CustomStepper {...stepperProps} />
        ) : null}
      </Box>
    </Modal>
  );
};

export default memo(CustomModal);
