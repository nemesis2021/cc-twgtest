import { clamp } from 'three/src/math/MathUtils';
import { animated, useSpring } from '@react-spring/web';
import { Box, BoxProps, Stack, styled, useTheme } from '@mui/material';
import React, {
  Children,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDrag } from '@use-gesture/react';
import useResizeObserver from '../../utils/hooks/useResizeObserver';

const ABox = animated(Box);

const SliderContainer = styled(Box)(() => ({
  position: 'relative',
}));

const TouchWrapper = styled(animated.div)(() => ({
  touchAction: 'pan-y',
}));

export interface HorizontalSliderProps extends BoxProps {
  spacing?: number;
  selected: number;
  setSelected: (i: number) => void;
  setMaxVisibleSlide?: Dispatch<SetStateAction<number>>;
  scrollBar?: boolean;
}

export default function HorizontalSlider(props: HorizontalSliderProps) {
  const {
    children,
    spacing = 2,
    selected,
    setSelected,
    setMaxVisibleSlide,
    scrollBar = true,
    ...restProps
  } = props;

  const theme = useTheme();
  const { primaryGreen, dirtyWhite } = theme.palette.common;

  const [maxScroll, setMaxScroll] = useState(0);
  const [movement, setMovement] = useState(0);
  const [thumbDragOffset, setThumbDragOffset] = useState(0);

  const { ref: slideRef, clientWidth: slideWidth } = useResizeObserver();
  const { ref, clientWidth } = useResizeObserver();
  const { ref: childRef, clientWidth: childWidth } = useResizeObserver();

  const ChildrenArray = Children.toArray(children);
  const noOfChildren = useMemo(() => ChildrenArray.length, [ChildrenArray]);

  const spaceBetweenSlides = spacing * 8;

  const [spring] = useSpring(
    () => ({
      x: -selected * (slideWidth + spaceBetweenSlides) + movement,
      config: { tension: 200, friction: 30 },
    }),
    [selected, movement],
  );

  const maxVisibleIndex = useMemo(() => {
    if (childWidth === 0 || clientWidth === 0 || noOfChildren === 0) return 0;

    const maxSlideFit = Math.floor(
      clientWidth / (slideWidth + spaceBetweenSlides),
    );

    const visibleIndex = noOfChildren - maxSlideFit;

    if (visibleIndex >= 1) {
      return visibleIndex;
    }

    return 0;
  }, [childWidth, clientWidth, noOfChildren, slideWidth, spaceBetweenSlides]);

  const bind = useDrag(
    ({ active, offset: [ox], direction: [dx], last, movement: [mx] }) => {
      if (last) {
        let index = Math.round(-ox / (slideWidth + spaceBetweenSlides));

        if (active && dx > slideWidth / 2) {
          index = dx > 0 ? index + 1 : index - 1;
        }

        setSelected(clamp(index, 0, maxVisibleIndex));
      }

      if (active) {
        setMovement(mx / 0.8);
      } else {
        setMovement(0);
      }
    },

    {
      from: () => [spring.x.get(), 0],
      bounds: { right: 0, left: maxScroll },
      filterTaps: true, // prevent click after drag
    },
  );

  useEffect(() => {
    setMaxScroll(-maxVisibleIndex * (slideWidth + spaceBetweenSlides));
    setSelected(0);
  }, [maxVisibleIndex, setSelected, slideWidth, spaceBetweenSlides]);

  // Scrollbar
  const totalScrollableWidth = Math.abs(maxScroll);
  const totalContentWidth = totalScrollableWidth + clientWidth;
  const thumbWidth = Number.isNaN(
    (clientWidth / totalContentWidth) * clientWidth,
  )
    ? 0
    : (clientWidth / totalContentWidth) * clientWidth;
  const maxThumbX = clientWidth - thumbWidth;

  const thumbDragRatio = spring.x.to((x) => Math.abs(x) / Math.abs(maxScroll));

  const thumbX = thumbDragRatio.to(
    (ratio) => Math.min(ratio * maxThumbX, maxThumbX) + thumbDragOffset * 0.1,
  );

  const [thumbSpring] = useSpring(
    () => ({
      x: thumbX,
    }),
    [thumbX],
  );

  const thumbDragBind = useDrag<number>(
    ({ movement: [mx], last, memo, first, active }) => {
      if (first) {
        // eslint-disable-next-line no-param-reassign
        memo = thumbX.get();
      }

      const newThumbX = Math.min(Math.max(memo + mx, 0), maxThumbX);

      const dragRatio = Number.isNaN(newThumbX) ? 0 : newThumbX / maxThumbX;
      const index = dragRatio * maxVisibleIndex;

      if (!last) {
        setSelected(Math.round(index));
      }

      if (last) {
        setSelected(Math.round(index));
      }

      const clampedMx = Math.min(Math.max(mx, -memo), maxThumbX - memo);

      if (active) {
        setThumbDragOffset(clampedMx);
      } else {
        setThumbDragOffset(0);
      }

      return memo;
    },
    {
      axis: 'x',
      bounds: { left: 0, right: maxThumbX },
      from: () => [thumbX.get(), 0],
      pointer: { touch: true },
    },
  );

  useEffect(() => {
    if (setMaxVisibleSlide) {
      setMaxVisibleSlide(maxVisibleIndex);
    }
  }, [maxVisibleIndex, setMaxVisibleSlide]);

  return (
    <Box component="div">
      <Box
        component="div"
        ref={slideRef}
        position="absolute"
        style={{ opacity: 0, pointerEvents: 'none' }}
      >
        {ChildrenArray[0]}
      </Box>
      <SliderContainer ref={ref} {...restProps}>
        <TouchWrapper style={spring} {...bind()}>
          <Stack
            ref={childRef}
            direction="row"
            columnGap={`${spaceBetweenSlides}px`}
            width="fit-content"
            alignItems="stretch"
          >
            {children}
          </Stack>
        </TouchWrapper>
      </SliderContainer>
      {maxVisibleIndex !== 0 && scrollBar && (
        <Box
          component="div"
          width="100%"
          height="13px"
          position="relative"
          display="flex"
          alignItems="center"
          mt={6.25}
          borderRadius="100px"
          overflow="hidden"
        >
          <Box
            component="div"
            width="100%"
            height="5px"
            bgcolor={dirtyWhite}
            borderRadius="100px"
          />
          <ABox
            component="div"
            width={thumbWidth}
            height="13px"
            bgcolor={primaryGreen}
            position="absolute"
            left="0"
            borderRadius="100px"
            sx={{ cursor: 'grab' }}
            style={thumbSpring}
            {...thumbDragBind()}
          />
        </Box>
      )}
    </Box>
  );
}
