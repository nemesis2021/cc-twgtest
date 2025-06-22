import { Box, BoxProps, Divider, styled } from '@mui/material';
import { animated, config, useSpring } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import theme from '../styles/theme/theme';

const AnimatedBox = animated(Box);

interface StyledDividerProps {
  color?: string;
}

const StyledDivider = styled(Divider, {
  shouldForwardProp: (propName) => propName !== 'color',
})<StyledDividerProps>(({ color }) => ({
  borderColor: color || theme.palette.divider,
}));

interface Props extends BoxProps {
  color?: string;
}

export default function AnimatedDivider(props: Props) {
  const { color, ...restProps } = props;

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 1 });

  const spring = useSpring({
    width: inView ? '100%' : '0%',
    opacity: inView ? 1 : 0.01,
    config: config.slow,
  });

  return (
    <AnimatedBox style={spring} ref={ref} {...restProps}>
      <StyledDivider color={color} />
    </AnimatedBox>
  );
}
