/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleErrors = (result: any) => {
  if (result?.error) {
    throw result.error.data;
  }
};

export const handleTryCatchError = (result: any) => {
  const error = result?.error
    ? result.error.data
    : result?.response?.data?.message;

  return error;
};

export const isValidDate = (value: string) => {
  const date = new Date(value);
  return date instanceof Date && !isNaN(date.getTime());
};

export const isError = (response: any): response is { message: string } => {
  return response && "error" in response;
};
