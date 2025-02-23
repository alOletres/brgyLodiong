export enum EValidFileExtension {
  PNG = "png",
  JPG = "jpg",
  JPEG = "jpeg",
  WORDX = "docx",
  WORDS = "docs",
  EXCEL = "xls",
  EXCELX = "xlsx",
}

export enum EValidMimeType {
  IMAGE_PNG = "image/png",
  IMAGE_JPG = "image/jpg",
  IMAGE_JPEG = "image/jpeg",
  APPLICATION_SPREADSHEET = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  APPLICATION_VND = "application/vnd.ms-excel",
  MS_WORD = "application/msword",
  MS_WORD_APPLICATION = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}

const findMimeType = (extension: `${EValidFileExtension}`) => {
  switch (extension) {
    case "docx":
      return EValidMimeType.MS_WORD;
    case "jpeg":
      return EValidMimeType.IMAGE_JPEG;
    case "jpg":
      return EValidMimeType.IMAGE_JPG;
    case "png":
      return EValidMimeType.IMAGE_PNG;
    case "xls":
    case "xlsx":
      return EValidMimeType.APPLICATION_SPREADSHEET;
  }
};
export const convertUrlToFile = async (
  url: string,
  fileName: string,
  mimeType: string
) => {
  const response = await fetch(url);
  const blob = await response.blob(); // Convert response to Blob

  return new File([blob], fileName, {
    type: findMimeType(mimeType as `${EValidFileExtension}`),
  }); // Create File object
};
