import { animated, SpringConfig, useSpring } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

interface Props {
  elements: React.ReactNode[];
  index: number;
  style?: React.CSSProperties;
  config?: SpringConfig;
  delay?: number;
  onResolveCallback?: () => void;
}

export default function AnimationTransitionFade(props: Props) {
  const { elements, index, style, config, delay, onResolveCallback } = props;
  const isInitial = useRef<boolean>(true);

  const [currIndex, setCurrIndex] = useState(index);

  const [spring, api] = useSpring(() => {});

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
    } else {
      api.start({
        opacity: 0,
        onResolve: () => {
          setCurrIndex(index);
          if (elements[index]) {
            api.start({ opacity: 1 });

            if (onResolveCallback) onResolveCallback();
          }
        },
        config,
        delay,
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <animated.div style={{ ...spring, ...style }}>
      {elements && elements[currIndex]}
    </animated.div>
  );
}
