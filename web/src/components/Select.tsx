/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  BaseSelectProps,
} from "@mui/material";
import { useField } from "formik";
import { ErrorWrapper } from "./TextFieldInput";

export type OptionSelect = {
  value?: string | number;
  key?: string | number;
};

interface SelectChangeEventEmitter {
  propertyName: string;
  value: any;
}

export interface SelectFieldProps extends BaseSelectProps {
  options?: OptionSelect[];
  inputLabelId: string;
  handleChange?: (value: any) => void;
  handleSelectChange?: (value: any) => SelectChangeEventEmitter;
}

const CustomSelect = ({
  options,
  inputLabelId,
  handleChange,
  value,
  ...props
}: SelectFieldProps) => {
  const [field, meta] = useField({ name: props.name! });
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
        value={value || ""}
        onChange={(e) => {
          if (handleChange) {
            handleChange(e.target.value);
          }
        }}
      >
        <MenuItem key="" value="">
          <em>None</em>
        </MenuItem>
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
