export enum FieldTypeEnum {
  TEXT = 'TEXT',
  EMAIL = 'EMAIL',
  TEXTAREA = 'TEXTAREA',
  SELECT = 'SELECT',
  PHONE = 'PHONE',
  CHECKBOX = 'CHECKBOX',
  RADIO = 'RADIO',
  SECTION = 'SECTION',
  PAGE = 'PAGE',
  CAPTCHA = 'CAPTCHA',
  FILEUPLOAD = 'FILEUPLOAD',
}

export type TextFieldType =
  | TextFieldModel
  | EmailFieldModel
  | PhoneFieldModel
  | TextAreaFieldModel;

export type FieldType =
  | TextFieldType
  | SelectFieldModel
  | CheckboxFieldModel
  | RadioFieldModel
  | SectionFieldModel
  | PageFieldModel
  | CaptchaFieldModel
  | FileFieldModel;

interface BaseFieldModel {
  id: number;
  isRequired: boolean;
  layoutGridColumnSpan: number;
  description?: string;
  conditionalLogic?: {
    rules: {
      value: string;
      fieldId: number;
    }[];
  };
}

export interface CaptchaFieldModel extends BaseFieldModel {
  type: FieldTypeEnum.CAPTCHA;
}

export interface ChoiceModel {
  text: string;
  value: string;
}

export interface TextFieldModel extends BaseFieldModel {
  label: string;
  type: FieldTypeEnum.TEXT;
  placeholder?: string;
  cssClass?: string;
}

export interface PhoneFieldModel extends BaseFieldModel {
  label: string;
  type: FieldTypeEnum.PHONE;
  placeholder?: string;
}

export interface EmailFieldModel extends BaseFieldModel {
  label: string;
  type: FieldTypeEnum.EMAIL;
  placeholder?: string;
}

export interface TextAreaFieldModel extends BaseFieldModel {
  label: string;
  type: FieldTypeEnum.TEXTAREA;
  placeholder?: string;
}

export interface SelectFieldModel extends BaseFieldModel {
  label: string;
  type: FieldTypeEnum.SELECT;
  placeholder?: string;
  choices: ChoiceModel[];
}

export interface CheckboxInputModel {
  label: string;
  id: number;
}

export interface CheckboxFieldModel extends BaseFieldModel {
  label: string;
  type: FieldTypeEnum.CHECKBOX;
  placeholder?: string;
  inputs: CheckboxInputModel[];
  labelPlacement: string;
}

export interface RadioFieldModel extends BaseFieldModel {
  type: FieldTypeEnum.RADIO;
  label: string;
  choices: ChoiceModel[];
}

export interface SectionFieldModel extends BaseFieldModel {
  type: FieldTypeEnum.SECTION;
  label: string;
}

export interface PageFieldModel extends BaseFieldModel {
  type: FieldTypeEnum.PAGE;
  label?: string;
}

export interface FileFieldModel extends BaseFieldModel {
  type: FieldTypeEnum.FILEUPLOAD;
  label: string;
  maxFileSize: number;
  allowedExtensions: string[];
}

export interface SubmitButtonModel {
  text: string;
  layoutGridColumnSpan: number;
}

export interface FormModel {
  formId: number;
  title: string;
  submitButton: SubmitButtonModel;
  formFields: {
    nodes: FieldType[];
  };
}

// Utils for form formatting

export interface CheckboxValueModel {
  value: string;
  checked: boolean;
}

export type CheckboxMapType = Map<number, CheckboxValueModel>;

export interface FormFieldPartialModel {
  value: string | CheckboxMapType;
  type: FieldTypeEnum;
}
