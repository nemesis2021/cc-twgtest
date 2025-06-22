import { Box, BoxProps } from '@mui/material';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props extends BoxProps {
  color?: string;
  threshold?: number | number[];
  immediate?: boolean;
  rootMargin?: string;
}

export default function AnimatedBackgroundWrapper({
  children,
  color,
  rootMargin,
  immediate = false,
  threshold = [0.48, 0.5, 0.52],
  ...restProps
}: Props) {
  const [skip, setSkip] = useState(true);

  const { ref, inView } = useInView({
    threshold,
    initialInView: false,
    rootMargin,
    skip,
  });

  useEffect(() => {
    if (inView && color) {
      document.body.style.backgroundColor = color;
    }
  }, [inView, color]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY <= 0 && immediate) {
        setSkip(false);
      } else if (window.scrollY >= 50 && !immediate) {
        setSkip(false);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [immediate]);

  return (
    <Box {...restProps} component="div" ref={ref}>
      {children}
    </Box>
  );
}
