import React from 'react';
import { animated, useSpring } from '@react-spring/web';

interface Props {
  visible?: boolean;
}

export default function AnimationFade(props: React.PropsWithChildren<Props>) {
  const { children, visible } = props;

  const spring = useSpring({
    opacity: visible ? 1 : 0,
    scale: visible ? 1 : 0.98,
  });

  return <animated.div style={spring}>{children}</animated.div>;
}
