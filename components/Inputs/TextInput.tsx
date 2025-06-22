import React, { ChangeEvent, FormEvent, useState } from 'react';
import { InputProps } from '@mui/base';
import {
  FormControl,
  styled,
  TypographyPropsVariantOverrides,
  InputBaseProps,
  TextField,
  alpha,
} from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { OverridableStringUnion } from '@mui/types';
import { FieldTypeEnum } from '../../utils/models/gravityForms/FormFieldModel';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  position: 'relative',
  ':hover input, :hover textarea': {
    ':not(:disabled)::placeholder, ': {
      opacity: 1,
    },
  },

  '& .MuiFormHelperText-root': {
    marginLeft: 0,
    marginTop: theme.spacing(1),
  },
}));

interface StyledTextFieldProps {
  typographyVariant: OverridableStringUnion<
    Variant,
    TypographyPropsVariantOverrides
  >;
  error?: boolean;
  textAreaHeight: string;
  disabled: boolean;
}

const StyledInputField = styled(TextField, {
  shouldForwardProp: (propName) =>
    !['typographyVariant', 'textAreaHeight'].includes(propName as string),
})<StyledTextFieldProps>(({ theme, typographyVariant, textAreaHeight }) => {
  const { cementGrey, primaryGreen, white } = theme.palette.common;

  return {
    width: '100%',
    '& .MuiInputBase-multiline': {
      padding: 0,
    },
    '& label': {
      color: cementGrey,
      fontSize: 14,
      width: '100%',
      '&.Mui-focused, &.MuiFormLabel-filled': {
        transform: 'translate(0, -1.2rem) scale(0.75)',
        color: primaryGreen,
      },
    },
    '& textarea': {
      height: `${textAreaHeight} !important`,
    },
    '& input, textarea': {
      ...theme.typography[typographyVariant],
      padding: theme.spacing(2.3),
      borderRadius: 12,
      border: '1px solid #EBEBEB',
      outline: 'none',
      width: '100%',
      color: cementGrey,
      backgroundColor: white,
      transition: 'all 200ms',
      '::placeholder': {
        color: cementGrey,
        opacity: 0.4,
        transition: 'all 200ms',
      },
      ':focus': {
        border: `1px solid ${primaryGreen}`,
      },
      ':disabled::placeholder': {
        color: alpha(cementGrey, 0.4),
        opacity: 1,
      },
    },
    '& .Mui-error': {
      fontSize: 14,
    },
    '& fieldset': {
      border: 'none',
    },
  };
});

interface Props extends InputBaseProps {
  hideLabel?: boolean;
  typographyVariant?: OverridableStringUnion<
    Variant,
    TypographyPropsVariantOverrides
  >;
  helperText?: string;
  errorText?: string;
  label?: string;
  textAreaHeight?: string;
}

export default function TextInput(props: Props & InputProps) {
  const {
    typographyVariant = 'body2',
    required,
    label,
    id,
    type,
    disabled,
    textAreaHeight = '159px',
    onChange,
    ...restProps
  } = props;

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOnChangeInputEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const inputField = event.target as HTMLInputElement;

    if (inputField.validity.valid) {
      setError(false);
      setErrorMessage('');
    } else {
      setError(true);
      setErrorMessage(inputField.validationMessage);
    }

    if (onChange) {
      onChange(event);
    }
  };

  const handleOnInvalidInputEvent = (event: FormEvent<HTMLInputElement>) => {
    const inputField = event.target as HTMLInputElement;

    setError(true);
    setErrorMessage(inputField.validationMessage);
  };

  return (
    <StyledFormControl variant="standard" fullWidth>
      <StyledInputField
        typographyVariant={typographyVariant}
        fullWidth
        multiline={type === FieldTypeEnum.TEXTAREA}
        rows={3}
        id={id?.toString()}
        name={id?.toString()}
        type={type}
        required={required}
        error={error}
        onInvalid={handleOnInvalidInputEvent}
        helperText={errorMessage}
        disabled={disabled ?? false}
        textAreaHeight={textAreaHeight}
        label={label}
        onChange={handleOnChangeInputEvent}
        {...restProps}
      />
    </StyledFormControl>
  );
}
