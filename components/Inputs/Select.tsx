import { useState } from 'react';
import {
  FormControl,
  Select as MUISelect,
  SelectProps,
  styled,
  useTheme,
  MenuItem,
  Typography,
  SelectChangeEvent,
  alpha,
  darken,
} from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import { ChoiceModel } from '../../utils/models/gravityForms/FormFieldModel';
import Chevron from '../../assets/icons/chevron.svg';

const ChevronContainer = styled(animated.div)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  right: 0,
  position: 'absolute',
  pointerEvents: 'none',
}));

const StyledFormControl = styled(animated(FormControl), {
  shouldForwardProp: (propName) => propName !== 'error',
})(({ theme }) => ({
  '& .MuiInputBase-root': {
    marginTop: 0,
    minWidth: 150,
  },

  '& .MuiSelect-select.MuiInput-input.MuiInputBase-input': {
    ...theme.typography.h6,
    minHeight: 'unset',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(3.2),
    display: 'flex',
    alignItems: 'center',
    transition: 'all 200ms',
    '& p': {
      transition: 'all 200ms',
      ...theme.typography.h6,
      color: theme.palette.common.primaryGreen,
    },

    ':hover p, &[aria-expanded=true] p': {
      background: 'transparent',
      color: darken(theme.palette.common.primaryGreen, 0.1),
      transform: 'scale(0.9)',
    },
    ':focus': {
      background: 'transparent',
    },
  },
}));

type Props = SelectProps & {
  data: ChoiceModel[];
  onChange?: (event: SelectChangeEvent<unknown>) => void;
};

export default function Select(props: Props) {
  const {
    open,
    fullWidth = false,
    data,
    id,
    required,
    error,
    disabled,
    onChange,
  } = props;

  const [isOpen, setIsOpen] = useState(open);
  const theme = useTheme();
  const { cementGrey, white, primaryGreen, strawberryRed } =
    theme.palette.common;

  const spring = useSpring({
    transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
  });

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    if (onChange) onChange(event);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function AnimatedIcon() {
    return (
      <ChevronContainer style={spring}>
        <Chevron width={14} color={disabled ? cementGrey : primaryGreen} />
      </ChevronContainer>
    );
  }

  return (
    <StyledFormControl variant="standard" fullWidth={fullWidth} error={error}>
      <MUISelect
        {...props}
        displayEmpty
        disableUnderline
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        IconComponent={AnimatedIcon}
        inputProps={{ id }}
        error={error}
        onChange={handleChange}
        MenuProps={{
          sx: {
            '& .MuiPaper-root': {
              marginTop: theme.spacing(0.5),
              backgroundColor: white,
              height: data.length > 20 ? '50vh' : 'undefined',
              boxShadow: '0px 5px 20px 0px rgba(7, 25, 55, 0.20)',
              borderRadius: '4px',
              '& .MuiList-root': {
                paddingTop: theme.spacing(0.5),
                paddingBottom: theme.spacing(0.5),
              },
              '& .MuiMenuItem-root': {
                paddingTop: theme.spacing(1.125),
                paddingBottom: theme.spacing(1.125),
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(3),
                background: white,
                '&.Mui-selected p': {
                  color: primaryGreen,
                  fontWeight: 800,
                },
              },
            },
          },
        }}
      >
        {data.map((option) => (
          <MenuItem value={option.value} key={option.value}>
            <Typography color={option.value === '' ? primaryGreen : cementGrey}>
              {option.text}
            </Typography>
          </MenuItem>
        ))}
      </MUISelect>
      {required && (
        <Typography
          variant="body1"
          component="label"
          htmlFor={id}
          color={disabled ? alpha(strawberryRed, 0.25) : strawberryRed}
          pb={1}
        >
          *
        </Typography>
      )}
    </StyledFormControl>
  );
}
