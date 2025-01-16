"use client";

import { PropsWithChildren } from "react";
import Snackbar from "@/components/Snackbar";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/utils/theme";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Snackbar />
        {children}
      </Provider>
    </ThemeProvider>
  );
};
