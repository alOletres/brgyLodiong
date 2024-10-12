import { styled, TextField } from "@mui/material";
import { ChangeEventHandler } from "react";
import { useField } from "formik";

export const ErrorWrapper = styled("div")({
  color: "#fc8181",
  fontSize: 10,
});
/**
 * Custom Input Props
 * Reactive Input built by formik third party library
 */
export interface CustomInputProps {
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  variant?: "outlined";
  margin?: "dense" | "normal" | "none";
  id?: string;
  size?: "small" | "medium";
  onChange?:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}

/**
 * Custom Input component
 */
export const CustomInput = ({
  variant = "outlined",
  margin = "dense",
  size = "medium",
  ...props
}: CustomInputProps) => {
  const [field, meta] = useField(props as Required<CustomInputProps>);

  return (
    <>
      <TextField
        size={size}
        {...field}
        {...props}
        variant={variant}
        margin={margin}
        className={meta.touched && meta.error ? "input-error" : ""}
        sx={{ width: "100%" }}
      />
      {meta.touched && meta.error && <ErrorWrapper>*{meta.error}</ErrorWrapper>}
    </>
  );
};
