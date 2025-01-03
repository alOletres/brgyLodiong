/**
 * Convert base64
 * @param url
 * @returns
 */
export const convertToBase64 = async (url: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(url);
  });
};
