import React from 'react';
import { animated, useSpring } from '@react-spring/web';

interface Props {
  isExpanded: boolean;
  style?: React.CSSProperties;
}

export default function AnimationExpandVertical(
  props: React.PropsWithChildren<Props>,
) {
  const { children, isExpanded, style } = props;

  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);

  const spring = useSpring({
    overflow: 'hidden',
    maxHeight: isExpanded ? `${height}px` : '0px',
    opacity: isExpanded ? 1 : 0,
  });

  React.useEffect(() => {
    const { current } = ref;

    const observer = new ResizeObserver((entries) => {
      setHeight(entries[0].target.scrollHeight);
    });
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [ref]);

  return (
    <animated.div style={spring}>
      <div ref={ref} style={style}>
        {children}
      </div>
    </animated.div>
  );
}
