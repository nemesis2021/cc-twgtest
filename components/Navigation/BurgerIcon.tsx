import { Box, BoxProps, useTheme } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';

interface Props extends BoxProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  width?: number;
  height?: number;
}

const LINE_WIDTH: number = 2.6;

export default function BurgerIcon(props: Props) {
  const { open, setOpen, width = 32, height = 32, ...restProps } = props;

  const theme = useTheme();
  const { primaryGreen } = theme.palette.common;

  const firstLineSpring = useSpring({
    d: open
      ? 'M 7.20117 8.00049 L 24.7992 23.9993'
      : 'M 3.20117 8.00049 L 28.7992 8.00049',
  });

  const secondLineSpring = useSpring({
    d: open ? 'M 28.7992 16 H 28.7992' : 'M 3.20117 16 H 28.7992',
    strokeWidth: open ? '0' : LINE_WIDTH.toString(),
  });

  const thirdLineSpring = useSpring({
    d: open
      ? 'M 7.20117 23.9993 L 24.7992 8.00049'
      : 'M 3.20117 23.9993 L 28.7992 23.9993',
  });

  return (
    <Box
      {...restProps}
      component="div"
      sx={{ cursor: 'pointer', pointerEvents: 'auto' }}
      onClick={() => setOpen(!open)}
      position="relative"
    >
      <svg
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
      >
        <animated.path
          d={firstLineSpring.d}
          stroke={primaryGreen}
          strokeWidth={LINE_WIDTH}
          strokeLinecap="round"
        />
        <animated.path
          d={secondLineSpring.d}
          stroke={primaryGreen}
          strokeWidth={secondLineSpring.strokeWidth}
          strokeLinecap="round"
        />
        <animated.path
          d={thirdLineSpring.d}
          stroke={primaryGreen}
          strokeWidth={LINE_WIDTH}
          strokeLinecap="round"
        />
      </svg>
    </Box>
  );
}
