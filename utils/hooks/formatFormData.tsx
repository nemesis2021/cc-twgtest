import {
  CheckboxInputModel,
  FormInputModel,
} from '../models/gravityForms/FormInputModel';

export default function formatFormData(
  form: HTMLFormElement,
  formData: FormData,
  captchaValue?: string | null,
  captchaFieldId?: number | null,
) {
  const formAnswers = Object.fromEntries(formData);
  const itemsToSubmit: FormInputModel[] = [];

  form.querySelectorAll('input, select, textarea').forEach((field) => {
    const fieldName = field.getAttribute('name');
    const fieldId = field.getAttribute('id');
    const fieldType = field.getAttribute('type');

    if (fieldName && fieldId && formAnswers[fieldName]) {
      const id = Math.floor(parseFloat(fieldId));
      const value = formAnswers[fieldName].toString();

      if (fieldType === 'email') {
        itemsToSubmit.push({ id, emailValues: { value } });
      } else if (fieldType === 'checkbox') {
        const uniqueFieldType = field.getAttribute('data-field-type');

        if (uniqueFieldType && uniqueFieldType.toLowerCase() === 'consent') {
          itemsToSubmit.push({ id, value });
        } else {
          const [parentId] = fieldId.split('.');
          const exists = itemsToSubmit.findIndex(
            (items) => items.id.toString() === parentId,
          );

          if (exists === -1) {
            itemsToSubmit.push({
              id: Number(parentId),
              checkboxValues: [{ inputId: Number(fieldId), value }],
            });
          } else {
            const checkboxField = itemsToSubmit[exists] as CheckboxInputModel;

            if (checkboxField) {
              checkboxField.checkboxValues.push({
                inputId: Number(fieldId),
                value,
              });
            }
          }
        }
      } else if (fieldType === 'file') {
        itemsToSubmit.push({ id, fileUploadValues: [formAnswers[fieldName]] });
      } else if (id) {
        itemsToSubmit.push({ id, value });
      }
    }
  });

  if (captchaValue && captchaFieldId) {
    itemsToSubmit.push({ id: captchaFieldId, value: captchaValue });
  }

  return itemsToSubmit;
}
