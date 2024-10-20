import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectSnackbarProps,
  setSnackbarProps as dispatchSnackbarProps,
  SnackProps,
} from "@/store/slice/snackbarSlice";

export function useSnackbar() {
  const dispatch = useDispatch();
  const snackbarProps = useSelector(selectSnackbarProps);

  const setSnackbarProps = useCallback(
    ({ open = true, ...props }: SnackProps) => {
      const snackbarProps: SnackProps = {
        open,
        autoHideDuration: 3000,
        ...props,
      };
      dispatch(dispatchSnackbarProps(snackbarProps));
    },
    [dispatch]
  );

  return {
    snackbarProps,
    setSnackbarProps,
  };
}
