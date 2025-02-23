/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import TextArea from "./TextArea";
import DatePicker from "./DatePicker";
import CustomDateTimePicker from "./DateTimePicker";
import { ModalFormProps, saveButtonWrapper } from "./Modal";
import { useHook as useModalHooks } from "./hooks/useModal";
import Select from "./Select";
import { CustomInput } from "./TextFieldInput";
import { useEffect } from "react";
import { useImperativeHandle, forwardRef } from "react";
import { FormGroupRef } from "./Stepper";

export interface CustomFormGroupProps extends ModalFormProps<any> {
  btnName?: string;
  onValidityChange?: (isValid: boolean) => void; // <-- New prop!
  onFinish?: (values: any, formikHelpers?: FormikHelpers<any>) => void; // <-- New prop for finish action
}

// eslint-disable-next-line react/display-name
const FormGroup = forwardRef<FormGroupRef, CustomFormGroupProps>(
  (formProps, ref) => {
    const {
      isInputField,
      isSelectField,
      isTextAreaField,
      isDateField,
      isDateTimeField,
    } = useModalHooks();
    return (
      <Box sx={{ width: "100%", alignItems: "center", maxHeight: "80vh" }}>
        <Formik
          initialValues={formProps.initialValues}
          validationSchema={formProps.validationSchema}
          onSubmit={(values, helpers) => {
            // If onFinish is provided, call it with the form values.
            if (formProps.onFinish) {
              formProps.onFinish(values, helpers);
            }
            // Also call the existing handleSubmit if needed.
            formProps.handleSubmit(values, helpers);
          }}
          enableReinitialize
          validateOnMount // Ensures Formik validates on mount
        >
          {({ submitForm, isSubmitting, setFieldValue, values, isValid }) => {
            // Notify parent about validity changes
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { onValidityChange } = formProps;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
              if (onValidityChange) {
                onValidityChange(isValid);
              }
              // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [isValid]);

            // Expose the submitForm method to the parent via ref
            useImperativeHandle(ref, () => ({
              submitForm,
            }));

            return (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    // Define this box as a container for container queries.
                    container: "inline-size",
                    display: "grid",
                    // gap: 2, // Spacing between elements
                    height: "fit-content",
                    // Default to a single column
                    gridTemplateColumns: "1fr",
                    // When the container (modal) is at least 600px wide, switch to two columns.
                    "@container (min-width: 500px)": {
                      gridTemplateColumns: "1fr 1fr",
                    },
                  }}
                >
                  {formProps.fields.map((field, index) => {
                    if (isInputField(field)) {
                      return (
                        <CustomInput
                          {...field.fieldProps}
                          onChange={(e) => {
                            if (field.fieldProps.name) {
                              if (field.fieldProps.type === "file") {
                                const target = e.target as HTMLInputElement;
                                const file = target.files?.[0];
                                setFieldValue(field.fieldProps.name, file);
                              } else {
                                setFieldValue(
                                  field.fieldProps.name,
                                  e.target.value
                                );
                              }
                            }
                          }}
                          key={index}
                        />
                      );
                    }

                    if (isSelectField(field)) {
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                </Box>
                {/* Submit Button */}
                {formProps.btnName ? (
                  <Box sx={saveButtonWrapper}>
                    <Button
                      disabled={isSubmitting}
                      variant="contained"
                      onClick={submitForm}
                    >
                      {formProps.btnName}
                    </Button>
                  </Box>
                ) : null}
              </Form>
            );
          }}
        </Formik>
      </Box>
    );
  }
);

export default FormGroup;
