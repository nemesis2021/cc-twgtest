import { Children, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  styled,
  Stack,
  StackProps,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useSprings, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

import useResizeObserver from '../../utils/hooks/useResizeObserver';
import mod from '../../utils/mod';

const Root = styled(Stack)(() => ({
  position: 'relative',
  wrap: 'nowrap',
}));

interface SliderWrapperProps {
  height?: React.CSSProperties['height'];
}

const SliderWrapper = styled('div')<SliderWrapperProps>(({ height }) => ({
  position: 'relative',
  width: '100%',
  height,
}));

const TouchWrapper = styled(animated.div)(() => ({
  touchAction: 'pan-y',
  position: 'absolute',
}));

interface Props extends StackProps {
  selected: number;
  setSelected: (v: number) => void;
  hoverExpandWidth?: number;
  spacing?: number;
  measureField?: string; // used for word count content measurement
}

export default function HorizontalSliderInfinite(props: Props) {
  const {
    children,
    selected,
    setSelected,
    hoverExpandWidth = 0,
    spacing = 20,
    measureField = 'body',
    ...restProps
  } = props;

  const cards = Children.toArray(children);

  const indexOfChildWithMostContent = useMemo(() => {
    if (cards.length === 0) return 0;

    let maxLength = 0;
    let maxIndex = 0;

    cards.forEach((card: any, index) => {
      // Try to get the data prop from the card or its children
      let content = '';
      if (card.props.data?.[measureField]) {
        content = card.props.data[measureField];
      } else if (card.props.children?.props?.data?.[measureField]) {
        // Handle case where card is wrapped in another component
        content = card.props.children.props.data[measureField];
      }

      if (content.length > maxLength) {
        maxLength = content.length;
        maxIndex = index;
      }
    });

    return maxIndex;
  }, [cards, measureField]);

  const [visibleChildIndicies, setVisibleChildIndicies] = useState<number[]>(
    [],
  );
  const touchWrapperRef = useRef<HTMLDivElement>(null);

  const {
    ref: childRef,
    clientWidth: childWidth,
    clientHeight: childHeight,
  } = useResizeObserver();

  const { ref, clientWidth: width } = useResizeObserver();

  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));

  const [springs, springsApi] = useSprings(
    visibleChildIndicies.length,
    (i) => {
      const totalCards = visibleChildIndicies.length;
      const middleIndex = (totalCards - 1) / 2;
      const offset = mod(i - selected, totalCards) - middleIndex;
      const center = isTablet ? -spacing : spacing;

      const x = offset * (childWidth + spacing) + center;
      const immediate = Math.abs(offset) === middleIndex;

      return {
        x,
        width: `${childWidth}px`,
        height: `${childHeight}px`,
        immediate: (k) => k === 'zIndex' || immediate,
      };
    },
    [width, childWidth, childHeight, selected, visibleChildIndicies],
  );

  const gestureBind = useGesture(
    {
      onHover: (params) => {
        if (hoverExpandWidth) {
          const { hovering } = params;
          const [hoverIndex] = params.args;
          const hoverOffsetX = (hoverExpandWidth - childWidth) / 2;

          springsApi.start((i) => {
            const totalCards = visibleChildIndicies.length;
            const middleIndex = (totalCards - 1) / 2;
            const offset = mod(i - selected, totalCards) - middleIndex;
            const center = isTablet ? -spacing : spacing;

            const tmpWidth =
              hovering && hoverIndex === i ? hoverExpandWidth : childWidth;

            const offsetFromHoverIndex =
              mod(i - hoverIndex, totalCards) - middleIndex;

            let x = offset * (childWidth + spacing) + center;

            if (hovering) {
              if (offsetFromHoverIndex < 0 && i !== hoverIndex) {
                x = offset * (childWidth + spacing) + center + hoverOffsetX;
              }

              if (offsetFromHoverIndex > 0 && i !== hoverIndex) {
                x = offset * (childWidth + spacing) + center - hoverOffsetX;
              }

              if (hoverIndex === i) {
                x = offset * (childWidth + spacing) + center - hoverOffsetX;
              }
            }

            const immediate = Math.abs(offset) === middleIndex;

            return {
              x,
              width: `${tmpWidth}px`,
              height: `${childHeight}px`,
              immediate,
            };
          });
        }
      },
      onDrag: ({
        active,
        movement: [mx],
        direction: [xDir],
        distance: [distance],
        cancel,
      }) => {
        if (active && distance > width / 4) {
          setSelected(selected + (xDir > 0 ? -1 : 1));
          cancel();
        }
        springsApi.start((i) => {
          const totalCards = visibleChildIndicies.length;
          const middleIndex = (totalCards - 1) / 2;
          const offset = mod(i - selected, totalCards) - middleIndex;
          const center = isTablet ? -spacing : spacing;

          const x =
            offset * (childWidth + spacing) + center + (active ? mx : 0);
          const immediate = Math.abs(offset) === middleIndex;

          return {
            x,
            width: `${childWidth}px`,
            height: `${childHeight}px`,
            immediate,
          };
        });
      },
    },
    {
      drag: {
        filterTaps: true,
      },
    },
  );

  // Update edge cards after shift
  useEffect(() => {
    const indicies = visibleChildIndicies;
    const total = indicies.length;

    if (!total) return;

    const middleIndex = (total - 1) / 2;
    const left = mod(selected, total);
    const right = mod(total - 1 + selected, total);

    indicies[left] = mod(selected - middleIndex, cards.length);
    indicies[right] = mod(selected + middleIndex, cards.length);

    setVisibleChildIndicies(indicies);
  }, [cards.length, visibleChildIndicies, selected]);

  // Init card array
  useEffect(() => {
    const indicies = [];
    const howManyCards = Math.ceil(width / (childWidth + spacing));
    const middleIndex =
      ((howManyCards % 2 === 0 ? howManyCards : howManyCards + 1) * 2) / 2;
    for (let i = -middleIndex; i < middleIndex + 1; i++) {
      indicies.push(mod(i, cards.length));
    }

    setVisibleChildIndicies(indicies);
    setSelected(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards.length, width, childWidth]);

  return (
    <Root ref={ref} {...restProps}>
      <Box
        component="div"
        ref={childRef}
        position="absolute"
        style={{ opacity: 0, pointerEvents: 'none' }}
      >
        {cards[indexOfChildWithMostContent]}
      </Box>

      <SliderWrapper height={childHeight} ref={touchWrapperRef}>
        {springs.map((style, i) => (
          <TouchWrapper style={style as any} {...gestureBind(i)}>
            {cards[visibleChildIndicies[i]]}
          </TouchWrapper>
        ))}
      </SliderWrapper>
    </Root>
  );
}
