/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  BaseSelectProps,
  Box,
  Chip,
  Avatar,
} from "@mui/material";
import { useField } from "formik";
import { ErrorWrapper } from "./TextFieldInput";
import { useMemo } from "react";
import { Person2Rounded } from "@mui/icons-material";

export type OptionSelect = {
  value?: string | number;
  key?: string | number;
};

interface SelectChangeEventEmitter {
  propertyName: string;
  value: any;
}

export interface SelectFieldProps extends BaseSelectProps {
  options: OptionSelect[];
  inputLabelId: string;
  handleChange?: (value: any) => void;
  handleSelectChange?: (value: any) => SelectChangeEventEmitter;
  value: string | OptionSelect[]; // Updated to handle objects
}

const CustomSelect = ({
  options,
  inputLabelId,
  handleChange,
  value,
  multiple = false,
  ...props
}: SelectFieldProps) => {
  const [field, meta] = useField({ name: props.name! });

  // Normalize value for single or multiple select
  const selectValue = useMemo(() => {
    if (multiple) {
      return Array.isArray(value)
        ? value.filter((value) => value).map((item) => item.key)
        : [];
    } else {
      const valued = value as OptionSelect;
      return valued || "";
    }
  }, [value, multiple]);

  return (
    <FormControl
      variant="outlined"
      sx={{ width: "100%" }}
      margin={props.margin}
    >
      <InputLabel id={inputLabelId}>{props.label}</InputLabel>
      <Select
        {...props}
        {...field}
        value={selectValue}
        renderValue={(selected) => {
          if (!Array.isArray(selected) && options?.length) {
            const selectedOption = options.find((opt) => opt.key === selected);
            return selectedOption?.value || "";
          }

          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {Array.isArray(selected) &&
                selected.map((key: any) => {
                  const selectedOption = options?.find(
                    (opt) => opt.key === key
                  );

                  return selectedOption ? (
                    <Chip
                      key={key}
                      label={selectedOption?.value || key}
                      icon={
                        <Avatar sx={{ width: 24, height: 24 }}>
                          <Person2Rounded />
                        </Avatar>
                      }
                    />
                  ) : (
                    ""
                  );
                })}
            </Box>
          );
        }}
        onChange={(e) => {
          const selectedKeys = e.target.value as any;

          if (multiple) {
            const selectedOptions = Object.values(selectedKeys).map(
              (key: any) => options.find((opt) => opt.key === key)
            );

            handleChange?.(selectedOptions);
          } else if (handleChange) {
            handleChange(e.target.value);
          }
        }}
        multiple={multiple}
      >
        {options?.length &&
          options.map((item) => {
            return (
              <MenuItem key={item.key} value={item.key}>
                {item.value}
              </MenuItem>
            );
          })}
      </Select>
      {meta.touched && meta.error && <ErrorWrapper>*{meta.error}</ErrorWrapper>}
    </FormControl>
  );
};

export default CustomSelect;
