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

const contentWrapperStyle: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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
  open: boolean;
  title: string;
  btnName?: string;
  modalFor?: "form" | "list" | "stepper";
  width?: number;
}

const CustomModal = ({
  handleClose,
  open,
  formProps,
  listProps,
  title,
  btnName = "Save",
  modalFor = "form",
  width,
  ...props
}: Props<any>) => {
  const {
    isInputField,
    isSelectField,
    isTextAreaField,
    isDateField,
    isDateTimeField,
  } = useModalHook();

  // Custom formFields
  const FormFields = (formProps: ModalFormProps<any>) => {
    return (
      <Box sx={{ width: "100%", alignItems: "center", maxHeight: "80vh" }}>
        <Formik
          initialValues={formProps.initialValues}
          validationSchema={formProps.validationSchema}
          onSubmit={formProps.handleSubmit}
          enableReinitialize
        >
          {({ submitForm, isSubmitting, setFieldValue, values }) => {
            return (
              <Form>
                {formProps.fields.map((field, index) => {
                  if (isInputField(field)) {
                    return (
                      <Input
                        {...field.fieldProps}
                        onChange={(e) => {
                          if (field.fieldProps.name) {
                            if (field.fieldProps.type === "file") {
                              const target = e.target as HTMLInputElement; // Type assertion

                              const file = target.files?.[0];

                              setFieldValue(field.fieldProps.name, file); // Update Formik state with file object
                            } else {
                              setFieldValue(
                                field.fieldProps.name,
                                e.target.value
                              ); // Handle other input types
                            }
                          }
                        }}
                        key={index}
                      />
                    );
                  }

                  if (isSelectField(field)) {
                    const { handleSelectChange, onChange, ...props } =
                      field.fieldProps;

                    return (
                      <Select
                        {...props}
                        handleChange={(e) => {
                          if (field.fieldProps.name) {
                            setFieldValue(field.fieldProps.name, e);
                          }

                          if (handleSelectChange) {
                            const { propertyName, value } =
                              handleSelectChange(e);

                            setFieldValue(propertyName, value);
                          }
                        }}
                        value={values[props.name as string]}
                        key={index}
                      />
                    );
                  }

                  if (isTextAreaField(field)) {
                    return (
                      <TextArea
                        {...field.fieldProps}
                        onChange={(e) => {
                          if (field.fieldProps.name) {
                            setFieldValue(
                              field.fieldProps.name,
                              e.target.value
                            );
                          }
                        }}
                        key={index}
                      />
                    );
                  }

                  if (isDateField(field)) {
                    return (
                      <DatePicker
                        {...field.fieldProps}
                        key={index}
                        onChange={(e) => {
                          if (field.fieldProps.name) {
                            setFieldValue(field.fieldProps.name, e);
                          }
                        }}
                      />
                    );
                  }

                  if (isDateTimeField(field)) {
                    return (
                      <CustomDateTimePicker
                        {...field.fieldProps}
                        key={index}
                        onChange={(e) => {
                          if (field.fieldProps.name) {
                            setFieldValue(field.fieldProps.name, e);
                          }
                        }}
                      />
                    );
                  }
                })}
                <Box sx={saveButtonWrapper}>
                  <Button
                    disabled={isSubmitting}
                    variant="contained"
                    onClick={submitForm}
                  >
                    {btnName}
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
    );
  };

  return (
    <Modal keepMounted open={open} onClose={handleClose} {...props}>
      <Box
        sx={{
          ...contentWrapperStyle,
          width,
        }}
      >
        <Typography>{title}</Typography>
        {modalFor === "form" && formProps ? (
          <FormFields {...formProps} />
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
        ) : null}
      </Box>
    </Modal>
  );
};

export default memo(CustomModal);
