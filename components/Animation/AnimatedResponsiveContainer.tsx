import { Box, BoxProps } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import React from 'react';

export default function AnimatedResponsiveContainer(props: BoxProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const [spring, springApi] = useSpring(() => ({
    height: '0px',
  }));

  React.useEffect(() => {
    const { current } = ref;

    const observer = new ResizeObserver((entries) => {
      springApi.start({
        height: `${entries[0].target.clientHeight}px`,
      });
    });
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return (
    <animated.div style={spring}>
      <Box {...props} component="div" ref={ref} />
    </animated.div>
  );
}
