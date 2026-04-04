const FILENAME_CAPTURE_GROUP_INDEX = 1;

const getFilenameFromResponse = (response: Response, fallbackFilename: string): string => {
  const contentDisposition = response.headers.get('Content-Disposition');

  if (!contentDisposition) {
    return fallbackFilename;
  }

  const filenameMatch = contentDisposition.match(/filename="?([^";\n]+)"?/);
  return filenameMatch?.[FILENAME_CAPTURE_GROUP_INDEX]?.trim() ?? fallbackFilename;
};

export const downloadBlob = (blob: Blob, response: Response, fallbackFilename: string): void => {
  const filename = getFilenameFromResponse(response, fallbackFilename);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};
