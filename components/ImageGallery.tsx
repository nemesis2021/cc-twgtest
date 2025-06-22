import { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import {
  BoxProps,
  Stack,
  StackProps,
  useMediaQuery,
  useTheme,
  Box,
  alpha,
} from '@mui/material';
import { useTransition, animated, useSpring, config } from '@react-spring/web';
import type { GalleryModel } from '../utils/models/ImageModel';
import { ColorTheme } from '../utils/models/ColorTheme';
import getColorFromTheme from '../utils/getColorFromTheme';
import { BORDER_RADIUS, BORDER_RADIUS_SM } from '../utils/styleGlobals';
import AnimatedImage from './AnimatedImage';
import ArrowButton from './Buttons/ArrowButton';
import HorizontalSlider from './Sliders/HorizontalSlider';
import VerticalSlider from './Sliders/VerticalSlider';

const ABox = animated(Box);

interface ThumbnailWrapperProps extends BoxProps {
  active: boolean;
  colorTheme: ColorTheme;
}

function ThumbnailWrapper(props: ThumbnailWrapperProps) {
  const { active, colorTheme, children, ...restProps } = props;

  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));

  const color = getColorFromTheme(colorTheme);

  const spring = useSpring({
    borderColor: active ? color : alpha(color ?? '', 0),
  });

  return (
    <ABox
      {...restProps}
      component="div"
      sx={{
        borderBottomWidth: isTablet || active ? 4 : 1,
        borderBottomStyle: 'solid',
        cursor: 'pointer',
      }}
      style={spring}
    >
      {children}
    </ABox>
  );
}

interface Props extends StackProps {
  data: GalleryModel;
  colorTheme: ColorTheme;
  r3fElement?: ReactElement;
  currIndex: number;
  setCurrIndex: Dispatch<SetStateAction<number>>;
}

export default function ImageGallery(props: Props) {
  const {
    data,
    colorTheme,
    r3fElement,
    currIndex,
    setCurrIndex,
    ...restProps
  } = props;
  const [selected, setSelected] = useState(0);

  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));

  const currentItem =
    currIndex === 0 ? null : { ...data.nodes[currIndex], index: currIndex };
  const node = isTablet ? currentItem : data.nodes[currIndex];

  const [animatedIndex, setAnimatedIndex] = useState(currIndex);

  const imageTransition = useTransition(node, {
    from: { opacity: 0, scale: 0.8 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0.8 },
    exitBeforeEnter: true,
    config: config.stiff,
    keys: currentItem ? currentItem.index : 'none',
    onRest: () => {
      setAnimatedIndex(currIndex);
    },
  });

  const handleThumbnailClick = (newIndex: number) => {
    if (currIndex !== newIndex) setCurrIndex(newIndex);
  };

  const prev = () => {
    const nextValue = currIndex === 0 ? data.nodes.length - 1 : currIndex - 1;

    setCurrIndex(nextValue);
  };

  const next = () => {
    setCurrIndex((currValue) => (currValue + 1) % data.nodes.length);
  };

  return (
    <Stack
      direction={{ xs: 'column-reverse', md: 'row' }}
      columnGap={4}
      rowGap={3}
      {...restProps}
    >
      {isTablet && (
        <VerticalSlider
          height={{ md: '39vw', xxxl: 820 }}
          minWidth="6.18vw"
          paddingY={0}
          spacing={1.25}
          ignoreChildrenChanges
        >
          {data.nodes.map((mediaItem, index) => (
            <ThumbnailWrapper
              width="100%"
              height="6.73vw"
              position="relative"
              onClick={() => handleThumbnailClick(index)}
              sx={{ userSelect: 'none', cursor: 'pointer' }}
              bgcolor="white"
              borderRadius={BORDER_RADIUS_SM}
              colorTheme={colorTheme}
              overflow="hidden"
              active={index === currIndex}
            >
              <AnimatedImage
                src={mediaItem.sourceUrl}
                alt={mediaItem.altText}
                sizes="6.73vw"
                objectFit={index === 0 ? 'contain' : 'cover'}
              />
            </ThumbnailWrapper>
          ))}
        </VerticalSlider>
      )}

      {!isTablet && (
        <HorizontalSlider
          paddingX={0}
          spacing={1.25}
          overflow="hidden"
          pt={1.25}
          selected={selected}
          setSelected={setSelected}
          scrollBar={false}
        >
          {data.nodes.map((mediaItem, index) => (
            <ThumbnailWrapper
              width={60}
              height={64}
              position="relative"
              onClick={() => handleThumbnailClick(index)}
              sx={{ userSelect: 'none', cursor: 'pointer' }}
              bgcolor="white"
              borderRadius={BORDER_RADIUS_SM}
              colorTheme={colorTheme}
              overflow="hidden"
              active={index === currIndex}
            >
              <AnimatedImage
                src={mediaItem.sourceUrl}
                alt={mediaItem.sourceUrl}
                sizes={`(max-width: ${md}px) 25vw, 15.83`}
                priority
                objectFit={index === 0 ? 'contain' : 'cover'}
              />
            </ThumbnailWrapper>
          ))}
        </HorizontalSlider>
      )}
      <Box
        component="div"
        width="100%"
        position="relative"
        display="flex"
        alignItems="center"
      >
        <Box component="div" position="absolute" left={12} top="45%" zIndex={5}>
          <ArrowButton
            arrow="left"
            onClick={prev}
            variant={colorTheme}
            buttonSize={44}
          />
        </Box>

        <Box
          component="div"
          position="relative"
          width="100%"
          height={{ xs: '85vw', md: '39vw', xxxl: 820 }}
          overflow="hidden"
        >
          {r3fElement && r3fElement}
          {imageTransition(
            (style, mediaItem) =>
              mediaItem && (
                <animated.div
                  style={{
                    ...style,
                    position: 'relative',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  <AnimatedImage
                    src={mediaItem?.sourceUrl}
                    alt={mediaItem?.altText}
                    sizes={`(max-width: ${md}px) 50vw, 88vw`}
                    borderRadius={BORDER_RADIUS}
                    objectFit={animatedIndex === 0 ? 'contain' : 'cover'}
                  />
                </animated.div>
              ),
          )}
        </Box>
        <Box
          component="div"
          position="absolute"
          right={12}
          top="45%"
          zIndex={5}
        >
          <ArrowButton onClick={next} variant={colorTheme} buttonSize={44} />
        </Box>
      </Box>
    </Stack>
  );
}
