import { styled, useTheme, useMediaQuery } from '@mui/material';
import { useSpring, animated, config } from '@react-spring/web';
import { useRouter } from 'next/router';
import React from 'react';

const ScrollContainer = styled(animated.div)(() => ({
  position: 'fixed',
  willChange: 'transform',
  right: 0,
  left: 0,
}));

interface Props {
  children: React.ReactNode[];
}

export default function SmoothScrollContainer(props: Props) {
  const { children } = props;

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up('md'));

  const router = useRouter();

  const [spring, springApi] = useSpring(() => ({
    y: 0,
  }));

  const ref = React.useRef(null);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    if (isTablet) {
      springApi.start({
        config: config.slow,
      });
    } else {
      springApi.start({
        config: { duration: 0 },
      });
    }
  }, [isTablet, springApi]);

  React.useEffect(() => {
    const handleChangeStart = () => {
      springApi.start({
        config: { duration: 0 },
      });
    };

    const handleChangeComplete = () => {
      springApi.start({
        y: 0,
        onResolve: () => {
          springApi.start({
            config: isTablet ? config.slow : { duration: 0 },
          });
        },
      });
    };

    router.events.on('routeChangeStart', handleChangeStart);
    router.events.on('routeChangeComplete', handleChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleChangeStart);
      router.events.off('routeChangeComplete', handleChangeComplete);
    };
  }, [isTablet, springApi, router]);

  React.useLayoutEffect(() => {
    const { current } = ref;
    const observer = new ResizeObserver((entries) => {
      setHeight(entries[0].target.scrollHeight);
    });
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [ref]);

  React.useEffect(() => {
    const handleScroll = () => springApi.start({ y: -window.scrollY });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [springApi]);

  return (
    <>
      <ScrollContainer style={spring} ref={ref}>
        {children}
      </ScrollContainer>
      <div style={{ height }} />
    </>
  );
}
