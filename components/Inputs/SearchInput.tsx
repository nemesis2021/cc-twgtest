import { Input, InputProps } from '@mui/base';
import { InputAdornment, styled, useTheme } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import React from 'react';
import SearchIcon from '../../assets/icons/Search.svg';
import PlusIcon from '../../assets/icons/Plus.svg';

const SearchIconWrapper = styled('div')(({ theme }) => ({
  right: 16,
  position: 'absolute',
  display: 'flex',
  color: theme.palette.common.cementGrey,
}));

const ClearIconWrapper = styled(animated.div)(() => ({
  right: 16,
  position: 'absolute',
  display: 'flex',
  transform: 'rotate(45deg)',
  cursor: 'pointer',
}));

const StyledInputAdornment = styled(InputAdornment)(() => ({
  color: 'inherit',
  minWidth: '40px',
  margin: 0,
}));

const StyledInput = styled(animated(Input))(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  borderRadius: '100px',
  border: '1px solid',
  paddingLeft: theme.spacing(3.75),

  '& input, textarea': {
    color: 'inherit',
    WebkitTextFillColor: 'inherit',
    fontSize: 16,

    '::placeholder': {
      color: 'inherit',
    },

    width: '100%',
    borderRadius: '100px',
    border: 0,
    outline: 'none',
    backgroundColor: 'transparent',
    height: '53px',

    '&:-webkit-autofill': {
      WebkitBoxShadow: `0 0 0 100px ${theme.palette.common.white} inset`,
    },
  },
}));

interface Props {
  onClear: () => void;
}

export default function SearchInput(props: Props & InputProps) {
  const { onClear, ...restProps } = props;

  const [hasValue, setHasValue] = React.useState(false);

  const theme = useTheme();
  const { divider } = theme.palette;
  const { cementGrey } = theme.palette.common;

  let color = divider;

  if (hasValue) {
    color = cementGrey;
  }

  const spring = useSpring({
    color,
  });

  const clearIconSpring = useSpring({
    opacity: hasValue ? 1 : 0,
  });

  React.useEffect(() => {
    setHasValue(!!restProps.value);
  }, [restProps.value]);

  return (
    <StyledInput
      style={spring}
      endAdornment={
        hasValue ? (
          <StyledInputAdornment position="end" disablePointerEvents={!hasValue}>
            <ClearIconWrapper style={clearIconSpring} onClick={onClear}>
              <PlusIcon width="23px" height="23px" />
            </ClearIconWrapper>
          </StyledInputAdornment>
        ) : (
          <StyledInputAdornment position="end" disablePointerEvents>
            <SearchIconWrapper>
              <SearchIcon width="23px" height="23px" />
            </SearchIconWrapper>
          </StyledInputAdornment>
        )
      }
      {...restProps}
    />
  );
}
