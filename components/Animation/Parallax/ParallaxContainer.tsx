import { Box, BoxProps, styled, useTheme, useMediaQuery } from '@mui/material';
import { animated, config, useSpring } from '@react-spring/web';
import React from 'react';

const Root = styled(animated(Box))(() => ({
  transformStyle: 'preserve-3d',
  willChange: 'transform',
}));

const getY = (
  ref: React.RefObject<HTMLDivElement>,
  speed: number,
  offset: number,
  sticky?: StickyProps,
): number => {
  const offsetTop = ref.current?.offsetTop ?? 0;
  const totalOffset = offsetTop + offset;
  const pageYOffset = typeof window !== 'undefined' ? window.pageYOffset : 0;

  if (sticky) {
    const { start, end } = sticky;

    if (pageYOffset < start + totalOffset) {
      return start;
    }
    if (pageYOffset > end + totalOffset) {
      return end;
    }

    return pageYOffset - totalOffset;
  }

  return (totalOffset - pageYOffset) * speed;
};

interface StickyProps {
  start: number;
  end: number;
  isRevertedCallback?: (y: number) => void;
}

interface Props extends BoxProps {
  speed?: number;
  offset?: number;
  sticky?: StickyProps;
}

function ParallaxContainer(props: Props, ref: React.Ref<HTMLDivElement>) {
  const { speed = 0, offset = 0, sticky, style, ...restProps } = props;

  const innerRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up('md'));

  const [spring, springApi] = useSpring(
    () => ({
      y: 0,
      config: isTablet ? config.slow : { duration: 0 },
    }),
    [isTablet],
  );

  React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

  React.useEffect(() => {
    const handleScroll = () => {
      const y = getY(innerRef, speed, offset, sticky);
      springApi.start({
        y,
      });

      if (sticky && sticky.isRevertedCallback) {
        sticky.isRevertedCallback(y);
      }
    };
    handleScroll();
    if (speed !== 0 || sticky) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, offset, springApi, sticky]);

  React.useEffect(() => {
    springApi.start({
      y: getY(innerRef, speed, offset, sticky),
      immediate: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerRef]);

  return (
    <Root
      ref={innerRef}
      style={{ ...spring, ...style }}
      width="100%"
      {...restProps}
    />
  );
}

export default React.forwardRef<HTMLDivElement, Props>(ParallaxContainer);
