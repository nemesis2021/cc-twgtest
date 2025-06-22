import { Box, styled, useTheme } from '@mui/material';
import { animated, config, useSpring } from '@react-spring/web';
import { useRouter } from 'next/router';
import React from 'react';
import AnimatedImage from './AnimatedImage';
import AnimationZoomIn from './Animation/AnimationZoomIn';

const ABox = animated(Box);

const Root = styled('div')(() => ({
  zIndex: 1301,
  position: 'fixed',
  display: 'flex',
  top: 0,
  left: 0,
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
}));

const Overlay = styled(animated.div)(({ theme }) => ({
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
}));

const LogoWrapper = styled('div')(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

interface NavigateAnimationProps {
  isVisible: boolean;
}

function NavigateAnimation(props: NavigateAnimationProps) {
  const { isVisible } = props;
  const theme = useTheme();
  const { md } = theme.breakpoints.values;

  return (
    <LogoWrapper>
      <AnimationZoomIn shouldAnimate={isVisible}>
        <ABox
          component="div"
          width={{ xs: 157, md: 193 }}
          height={{ xs: 82, md: 101 }}
          position="relative"
          mb={3.5}
        >
          <AnimatedImage
            src="/images/logo.png"
            alt="CapriCare"
            sizes={`(max-width: ${md}px) 50vw, 13.5vw`}
            objectFit="contain"
          />
        </ABox>
      </AnimationZoomIn>
    </LogoWrapper>
  );
}

interface FirstLoadAnimationProps {
  onResolve: () => void;
}

function FirstLoadAnimation(props: FirstLoadAnimationProps) {
  const { onResolve } = props;

  const theme = useTheme();
  const { md } = theme.breakpoints.values;

  return (
    <LogoWrapper>
      <AnimationZoomIn onResolve={onResolve}>
        <ABox
          component="div"
          width={{ xs: 157, md: 193 }}
          height={{ xs: 82, md: 101 }}
          position="relative"
          mb={3.5}
        >
          <AnimatedImage
            src="/images/logo.png"
            alt="CapriCare"
            sizes={`(max-width: ${md}px) 50vw, 13.5vw`}
            objectFit="contain"
          />
        </ABox>
      </AnimationZoomIn>
    </LogoWrapper>
  );
}

export default function PageTransition() {
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(true);
  const [canChangeRoute, setCanChangeRoute] = React.useState(false);
  const [nextUrl, setNextUrl] = React.useState<string>();
  const router = useRouter();

  const onResolveFirstLoad = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsFirstLoad(false);
    }, 2000);
  };

  const overlaySpring = useSpring({
    opacity: isVisible ? 1 : 0,
    onStart: () => {
      setCanChangeRoute(false);
    },
    onResolve: () => {
      setCanChangeRoute(!!nextUrl);
    },
    config: config.stiff,
  });

  React.useEffect(() => {
    const onRouteChangeStart = (
      url: string,
      options?: { shallow: boolean },
    ) => {
      if (options?.shallow) return;
      if (!canChangeRoute) {
        setNextUrl(url);
        router.events.emit('routeChangeError');
        // eslint-disable-next-line no-throw-literal
        throw 'Abort route change to start animation.';
      }
    };

    const onRouteChangeComplete = (
      url: string,
      options?: { shallow: boolean },
    ) => {
      if (options?.shallow) return;
      setNextUrl(undefined);
      setIsVisible(false);
    };

    const onRouteChangeError = (
      err: any,
      url: string,
      options?: { shallow: boolean },
    ) => {
      if (options?.shallow) return;
      setIsVisible(true);
    };

    router.events.on('routeChangeStart', onRouteChangeStart);
    router.events.on('routeChangeComplete', onRouteChangeComplete);
    router.events.on('routeChangeError', onRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.events.off('routeChangeComplete', onRouteChangeComplete);
      router.events.off('routeChangeError', onRouteChangeError);
    };
  }, [router.events, canChangeRoute]);

  React.useEffect(() => {
    if (canChangeRoute && nextUrl) router.push(nextUrl);
  }, [canChangeRoute, nextUrl, router]);

  return (
    <Root
      style={{
        pointerEvents: isVisible ? 'auto' : 'none',
        alignItems: isVisible ? 'flex-end' : 'unset',
      }}
    >
      <Overlay style={overlaySpring}>
        {isFirstLoad ? (
          <FirstLoadAnimation onResolve={onResolveFirstLoad} />
        ) : (
          <NavigateAnimation isVisible={isVisible} />
        )}
      </Overlay>
    </Root>
  );
}
