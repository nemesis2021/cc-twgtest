import { Button, ButtonProps } from '@mui/base';
import { alpha, styled, Typography, useTheme } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import useGetHoverState from '../../utils/hooks/useGetHoverState';

interface SizeProps {
  size: React.CSSProperties['height'];
}

const StyledButton = styled(animated(Button))<SizeProps>(({ size }) => ({
  border: 0,
  cursor: 'pointer',
  position: 'relative',
  height: size,
  width: size,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

interface Props extends ButtonProps {
  size?: number;
  label?: string;
  active?: boolean;
}

export default function CircleButton(props: Props) {
  const { children, disabled, size = 50, active, label, ...restProps } = props;

  const { isHovering, hoverBind } = useGetHoverState();
  const theme = useTheme();
  const { primaryGreen, white } = theme.palette.common;

  const toggle = (isHovering || active) && !disabled;

  const buttonSpring = useSpring({
    color: toggle ? white : primaryGreen,
    backgroundColor: toggle ? primaryGreen : alpha(primaryGreen, 0),
    scale: isHovering ? 0.9 : 1,
    border: `1px solid ${toggle ? alpha(primaryGreen, 0) : primaryGreen}`,
    opacity: disabled ? 0.7 : 1,
  });

  return (
    <StyledButton
      {...hoverBind()}
      style={buttonSpring}
      size={size}
      disabled={disabled}
      aria-label={label}
      {...restProps}
    >
      <Typography variant="button">{children}</Typography>
    </StyledButton>
  );
}
