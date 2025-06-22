import { alpha, Box } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import { useAnimatedBackground } from './Context/AnimatedBackgroundContext';

const ABox = animated(Box);

export default function AnimatedBackground() {
  const { color } = useAnimatedBackground();

  const bgSpring = useSpring({
    background: `radial-gradient(50% 50% at 50% 50%, ${alpha(
      color,
      0.2,
    )} 0%, ${color} 100%)`,
  });

  return (
    <ABox
      component="div"
      width="100%"
      height="100vh"
      style={bgSpring}
      position="fixed"
      top="0"
      left="0"
    />
  );
}
