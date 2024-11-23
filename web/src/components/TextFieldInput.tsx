/* eslint-disable @next/next/no-img-element */
import { Box, styled, TextField } from "@mui/material";
import { ChangeEventHandler } from "react";
import { useField } from "formik";
import { useHookTextField } from "./hooks/useTextField";
import Image from "next/image";
import LandscapeImage from "./../assets/landscape.jpg";

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
  onChange,
  ...props
}: CustomInputProps) => {
  const [field, meta, helpers] = useField(props as Required<CustomInputProps>);

  const { preview, handleChangeFile } = useHookTextField();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (props.type === "file") {
      const selectedFile = e.target.files?.[0];

      if (selectedFile) {
        handleChangeFile(selectedFile); // Custom file handling logic
        helpers.setValue(selectedFile); // Update Formik's state
        helpers.setTouched(true);
      }
    } else {
      field.onChange(e); // Use Formik's default handler
    }

    // Call any additional onChange passed via props
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <>
      <TextField
        size={size}
        {...field}
        {...props}
        variant={variant}
        margin={margin}
        onChange={handleChange}
        className={meta.touched && meta.error ? "input-error" : ""}
        sx={{ width: "100%" }}
        slotProps={{
          htmlInput: props.type === "file" ? { accept: "image/*" } : undefined, // Use slotProps for input attributes
        }}
        type={props.type} // Pass type directly
        value={props.type === "file" ? undefined : field.value} // Ensure file input does not bind value
      />
      {meta.touched && meta.error && <ErrorWrapper>*{meta.error}</ErrorWrapper>}

      {props.type === "file" && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={preview ? preview : LandscapeImage}
            alt="Landscape"
            width="200"
            height={100}
          />
        </Box>
      )}
    </>
  );
};
