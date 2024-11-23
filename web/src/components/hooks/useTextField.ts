/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export const useHookTextField = () => {
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const handleChangeFile = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl); // Clean up memory
    };
  };
  return {
    handleChangeFile,
    preview,
  };
};
