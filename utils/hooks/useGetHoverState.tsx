import { useHover } from '@use-gesture/react';
import React from 'react';

export default function useGetHoverState() {
  const [isHovering, setIsHovering] = React.useState(false);

  const hoverBind = useHover(({ hovering }) => {
    setIsHovering(hovering ?? false);
  });

  return { isHovering, hoverBind };
}
