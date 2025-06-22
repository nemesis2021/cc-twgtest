import { ReactNode } from 'react';
import { Box, BoxProps } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import useGetHoverState from '../../utils/hooks/useGetHoverState';

const ABox = animated(Box);

interface Props extends BoxProps {
  children: ReactNode;
  hoverScale?: number;
}

export default function AnimatedHoverZoomWrapper({
  children,
  hoverScale = 0.9,
  ...restProps
}: Props) {
  const { isHovering, hoverBind } = useGetHoverState();

  const springStyle = useSpring({
    scale: isHovering ? hoverScale : 1,
    opacity: isHovering ? 0.87 : 1,
  });

  return (
    <ABox {...restProps} style={springStyle} {...hoverBind()}>
      {children}
    </ABox>
  );
}
