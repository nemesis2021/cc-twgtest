import React from 'react';
import { animated, config, useSpring } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

interface Props {
  threshold?: number;
  delay?: number;
  scaleStart?: number;
  style?: React.CSSProperties;
  shouldAnimate?: boolean;
  onResolve?: () => void;
}

export default function AnimationZoomIn(props: React.PropsWithChildren<Props>) {
  const {
    children,
    threshold = 0.8,
    delay = 100,
    style,
    scaleStart = 0.8,
    shouldAnimate,
    onResolve,
  } = props;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
    skip: shouldAnimate !== undefined,
  });

  const animate = shouldAnimate !== undefined ? shouldAnimate : inView;

  const spring = useSpring({
    zIndex: 1,
    opacity: animate ? 1 : 0,
    scale: animate ? 1 : scaleStart,
    delay,
    config: config.wobbly,
    onRest: onResolve,
  });

  return (
    <animated.div
      style={{ ...spring, ...style, willChange: 'transform' }}
      ref={shouldAnimate === undefined ? ref : undefined}
    >
      {children}
    </animated.div>
  );
}
