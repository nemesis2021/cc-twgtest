import Input from './Inputs/TextInput';
import {
  FieldType,
  FieldTypeEnum,
} from '../utils/models/gravityForms/FormFieldModel';

interface Props {
  formField: FieldType;
}

export default function FormField(props: Props) {
  const { formField } = props;
  const { id, type, isRequired } = formField;

  if (type === FieldTypeEnum.TEXTAREA) {
    return (
      <Input
        id={id.toString()}
        name={id.toString()}
        placeholder={
          'placeholder' in formField ? formField.placeholder : undefined
        }
        multiline
        required={isRequired}
        label={formField.label ?? ''}
      />
    );
  }

  if (type === FieldTypeEnum.CAPTCHA) {
    return null;
  }

  return (
    <Input
      id={id.toString()}
      name={id.toString()}
      placeholder={formField.label ?? ''}
      label={formField.label ?? ''}
      type={type.toLowerCase()}
      required={isRequired}
      hideLabel
    />
  );
}
