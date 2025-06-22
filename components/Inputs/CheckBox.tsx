import React from 'react';
import {
  Box,
  Checkbox as MuiCheckbox,
  FormControlLabel,
  Typography,
  styled,
  useTheme,
  TypographyTypeMap,
  alpha,
} from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import { CheckboxInputModel } from '../../utils/models/gravityForms/FormFieldModel';
import CheckedIcon from '../../assets/icons/check.svg';
import useGetHoverState from '../../utils/hooks/useGetHoverState';

const ATypography = animated(Typography);
const ABox = animated(Box);

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 13,
  paddingLeft: 2,
  '.MuiFormControlLabel-asterisk': {
    display: 'none',
  },
}));

const StyledCheckbox = styled(MuiCheckbox)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: 0,
  paddingRight: theme.spacing(1.5),
  '& .MuiSvgIcon-root': {
    display: 'none', // Hide the default checkbox icon
  },
  '& .MuiButtonBase-root': {
    padding: 0,
  },
}));

interface CheckboxProps {
  checked?: boolean;
  isHovering?: boolean;
}

function CheckboxIcon(props: CheckboxProps) {
  const { checked, isHovering } = props;

  const theme = useTheme();
  const { primaryGreen, white, cementGrey } = theme.palette.common;

  const dotSpring = useSpring({
    background: checked || isHovering ? primaryGreen : alpha(primaryGreen, 0),
    borderColor: checked || isHovering ? primaryGreen : cementGrey,
  });

  return (
    <ABox
      component="div"
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={16}
      width={16}
      borderRadius="50%"
      border="1px solid"
      style={dotSpring}
    >
      {checked && (
        <CheckedIcon width={10} height={10} style={{ color: white }} />
      )}
    </ABox>
  );
}

interface Props {
  data: CheckboxInputModel;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disabled?: boolean;
  typographyProps?: TypographyTypeMap['props']['variant'];
  required?: boolean;
}

export default function CheckBox(props: Props) {
  const {
    data,
    name,
    onChange,
    checked,
    disabled,
    typographyProps = 'body1',
    required = false,
  } = props;
  const { label, id } = data;

  const theme = useTheme();
  const { cementGrey, primaryGreen } = theme.palette.common;

  const { isHovering, hoverBind } = useGetHoverState();

  const labelSpring = useSpring({
    x: isHovering ? 4 : 1,
    color: isHovering ? primaryGreen : cementGrey,
  });

  return (
    <StyledFormControlLabel
      {...hoverBind()}
      required={required}
      control={
        <StyledCheckbox
          disableRipple
          checked={checked}
          disabled={disabled}
          icon={<CheckboxIcon checked={false} isHovering={isHovering} />}
          checkedIcon={<CheckboxIcon checked />}
          name={name}
          value={label}
          id={id.toString()}
          onChange={onChange}
        />
      }
      label={
        <ATypography style={labelSpring} variant={typographyProps}>
          {label}
        </ATypography>
      }
    />
  );
}
