import React from 'react';
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
} from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import DropdownArrowIcon from '../../assets/icons/DropdownArrow.svg';
import { ChoiceModel } from '../../utils/models/gravityForms/FormFieldModel';

const ChevronContainer = styled(animated.div)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '22px',
  height: '22px',
  right: '25px',
  position: 'absolute',
  pointerEvents: 'none',
}));

const StyledFormControl = styled(animated(FormControl), {
  shouldForwardProp: (propName) => propName !== 'error',
})(({ theme }) => ({
  '& .MuiInputBase-root': {
    marginTop: 0,
  },

  '& .MuiSelect-select.MuiInput-input.MuiInputBase-input': {
    ...theme.typography.body1,
    paddingTop: theme.spacing(1.25),
    paddingBottom: theme.spacing(1.25),
    paddingLeft: theme.spacing(3.75),
    paddingRight: theme.spacing(10),
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.common.primaryGreen}`,
    borderRadius: '50px',
  },
}));

type Props = SelectProps & {
  data: ChoiceModel[];
  placeholder?: string;
  onChange?: (event: SelectChangeEvent<unknown>) => void;
  prefix?: string;
};

export default function RoundSelect(props: Props) {
  const {
    open,
    fullWidth,
    data,
    id,
    placeholder,
    error,
    onChange,
    value,
    prefix,
  } = props;

  const [isOpen, setIsOpen] = React.useState(open);
  const [focus, setFocus] = React.useState(false);
  const theme = useTheme();
  const { primaryGreen, white } = theme.palette.common;

  const iconSpring = useSpring({
    transform: isOpen ? 'rotate(-180deg) ' : 'rotate(0deg)',
  });

  const borderSpring = useSpring({
    borderColor: alpha(primaryGreen, focus ? 1 : 0.2),
  });

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    if (onChange) onChange(event);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function AnimatedIcon() {
    return (
      <ChevronContainer style={iconSpring}>
        <DropdownArrowIcon width="14px" color={primaryGreen} />
      </ChevronContainer>
    );
  }

  return (
    <StyledFormControl
      variant="standard"
      fullWidth={fullWidth}
      error={error}
      style={borderSpring}
    >
      <MUISelect
        {...props}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        displayEmpty
        disableUnderline
        variant="standard"
        placeholder={placeholder}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        IconComponent={AnimatedIcon}
        inputProps={{ id }}
        error={error}
        onChange={handleChange}
        value={value}
        renderValue={(selected) => (
          <Typography
            color={primaryGreen}
            variant="button"
            textTransform="capitalize"
          >
            {`${prefix ?? ''} ${(selected as string) || placeholder}`}
          </Typography>
        )}
        MenuProps={{
          sx: {
            '& .MuiPaper-root': {
              marginTop: theme.spacing(0.5),
              backgroundColor: white,
              maxHeight: '100vh',
              boxShadow: '0px 5px 20px 0px rgba(7, 25, 55, 0.20)',
              borderRadius: '10px',
              '& .MuiList-root': {
                paddingTop: 0,
                paddingBottom: 0,
              },
              '& .MuiMenuItem-root': {
                padding: theme.spacing(2),
                background: white,
                '&.Mui-selected p': {
                  fontWeight: 500,
                },
                transition: 'background 0.2s',
                ':hover': {
                  background: alpha(primaryGreen, 0.1),
                },
              },
            },
          },
        }}
      >
        {data.map((option) => (
          <MenuItem value={option.value} key={option.value}>
            <Typography color={primaryGreen} variant="caption">
              {option.text}
            </Typography>
          </MenuItem>
        ))}
      </MUISelect>
    </StyledFormControl>
  );
}
