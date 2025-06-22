export interface EmailInputModel {
  id: number;
  emailValues: {
    value: string;
  };
}

export interface CheckboxValuesModel {
  inputId: number;
  value: string;
}

export interface CheckboxInputModel {
  id: number;
  checkboxValues: CheckboxValuesModel[];
}

export interface FileInputModel {
  id: number;
  fileUploadValues: FormDataEntryValue[];
}

export interface DefaultInputModel {
  id: number;
  value: string;
}

export type FormInputModel =
  | EmailInputModel
  | CheckboxInputModel
  | FileInputModel
  | DefaultInputModel;
