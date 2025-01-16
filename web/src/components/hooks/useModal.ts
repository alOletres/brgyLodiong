import { InputProps, TextareaAutosizeProps } from "@mui/material";
import { SelectFieldProps } from "@/components/Select";
import { CustomDatePickerProps } from "../DatePicker";
import { CustomDateTimePickerProps } from "../DateTimePicker";

type FieldType = "text" | "select" | "textarea" | "date" | "dateTime";

/**
 * Props for `input` field, this is extending the {@link InputProps} from `@mui/material`
 * @label input label
 * @variant input variant
 */
export interface InputFieldProps extends InputProps {
  label?: string;
  variant?: "outlined";
}

/**
 * Properties for field
 * @fieldType see {@link FieldType}
 * @fieldProps props for the field, see {@link InputFieldProps} | {@link SelectFieldProps}
 */
export interface Field<
  T extends
    | InputFieldProps
    | SelectFieldProps
    | TextareaAutosizeProps
    | CustomDatePickerProps
    | CustomDateTimePickerProps
> {
  fieldType: FieldType;
  fieldProps: T;
}

export const useHook = () => {
  const isInputField = (
    data: Field<
      | InputFieldProps
      | SelectFieldProps
      | TextareaAutosizeProps
      | CustomDatePickerProps
      | CustomDateTimePickerProps
    >
  ): data is Field<InputFieldProps> => data.fieldType === "text";

  const isSelectField = (
    data: Field<
      | InputFieldProps
      | SelectFieldProps
      | TextareaAutosizeProps
      | CustomDatePickerProps
      | CustomDateTimePickerProps
    >
  ): data is Field<SelectFieldProps> => data.fieldType === "select";

  const isTextAreaField = (
    data: Field<
      | InputFieldProps
      | SelectFieldProps
      | TextareaAutosizeProps
      | CustomDatePickerProps
      | CustomDateTimePickerProps
    >
  ): data is Field<TextareaAutosizeProps> => data.fieldType === "textarea";

  const isDateField = (
    data: Field<
      | InputFieldProps
      | SelectFieldProps
      | TextareaAutosizeProps
      | CustomDatePickerProps
      | CustomDateTimePickerProps
    >
  ): data is Field<CustomDatePickerProps> => data.fieldType === "date";

  const isDateTimeField = (
    data: Field<
      | InputFieldProps
      | SelectFieldProps
      | TextareaAutosizeProps
      | CustomDatePickerProps
      | CustomDateTimePickerProps
    >
  ): data is Field<CustomDateTimePickerProps> => data.fieldType === "dateTime";

  return {
    isInputField,
    isSelectField,
    isTextAreaField,
    isDateField,
    isDateTimeField,
  };
};
