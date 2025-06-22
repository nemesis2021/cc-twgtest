import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

interface Props {
  threshold?: number;
  delay?: number;
  style?: React.CSSProperties;
  shouldAnimate?: boolean;
}

export default function AnimationFadeIn(props: React.PropsWithChildren<Props>) {
  const { children, threshold = 0.8, delay, style, shouldAnimate } = props;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
    skip: shouldAnimate !== undefined,
  });

  const animate = shouldAnimate !== undefined ? shouldAnimate : inView;

  const spring = useSpring({
    zIndex: 1,
    opacity: animate ? 1 : 0,
    scale: animate ? 1 : 0.98,
    delay,
  });

  return (
    <animated.div style={{ ...spring, ...style }} ref={ref}>
      {children}
    </animated.div>
  );
}
