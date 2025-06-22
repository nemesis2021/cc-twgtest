import { animated, useSpring } from '@react-spring/web';
import { Box, BoxProps, Stack, styled } from '@mui/material';
import React from 'react';
import { useDrag, useWheel } from '@use-gesture/react';

const Root = styled(Box)(() => ({
  position: 'relative',
  overflow: 'hidden',
}));

const TouchWrapper = styled(animated.div)(() => ({
  touchAction: 'pan-y',
}));

export interface HorizontalSliderProps extends BoxProps {
  paddingY?: number;
  spacing?: number;
  ignoreChildrenChanges?: boolean;
}

export default function VerticalSlider(props: HorizontalSliderProps) {
  const {
    children,
    spacing = 3.75,
    paddingY = 2.5,
    ignoreChildrenChanges = false,
    ...restProps
  } = props;

  const paddingYPx = paddingY * 8;

  const [maxScroll, setMaxScroll] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  const [spring, springApi] = useSpring(() => ({
    y: 0,
  }));

  const handleResize = (elem: Element) => {
    const { clientHeight, scrollHeight } = elem;
    setMaxScroll(clientHeight - scrollHeight - paddingYPx);
  };

  const bind = useDrag(
    ({ active, offset }) => {
      if (active) {
        springApi.start(() => ({
          y: offset[1],
        }));
      }
    },
    {
      from: () => [0, spring.y.get()],
      bounds: { top: maxScroll === -paddingYPx ? 0 : maxScroll, bottom: 0 },
      filterTaps: true, // prevent click after drag
    },
  );

  const bindWheel = useWheel(
    ({ active, offset }) => {
      if (active) {
        springApi.start(() => ({
          y: offset[1],
        }));
      }
    },
    {
      from: () => [0, spring.y.get()],
      bounds: { top: maxScroll === -paddingYPx ? 0 : maxScroll, bottom: 0 },
      filterTaps: true, // prevent click after drag
    },
  );

  React.useEffect(() => {
    const { current } = ref;
    const resizeObserver = new ResizeObserver((entries) => {
      handleResize(entries[0].target);
      springApi.start({ y: 0 });
    });
    if (current) {
      resizeObserver.observe(current);
    }
    return () => {
      if (current) {
        resizeObserver.unobserve(current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  React.useEffect(() => {
    if (!ignoreChildrenChanges) {
      if (ref.current) handleResize(ref.current);
      springApi.start({ y: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, ignoreChildrenChanges]);

  return (
    <Root ref={ref} paddingY={paddingY} {...restProps}>
      <TouchWrapper style={spring} {...bind()} {...bindWheel()}>
        <Stack direction="column" spacing={spacing} height="fit-content">
          {children}
        </Stack>
      </TouchWrapper>
    </Root>
  );
}
