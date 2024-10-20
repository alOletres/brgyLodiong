"use client";

import { PropsWithChildren } from "react";
import Snackbar from "@/components/Snackbar";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <Snackbar />
      {children}
    </Provider>
  );
};
