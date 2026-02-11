export const getFormFieldValue = (formData: FormData, fieldName: string) => {
  const value = formData.get(fieldName);

  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
};
