/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleErrors = (result: any) => {
  if (result.error) {
    throw result.error.data;
  }
};

export const isValidDate = (value: string) => {
  const date = new Date(value);
  return date instanceof Date && !isNaN(date.getTime());
};
