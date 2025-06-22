import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  CONTENT_GAP,
  MAX_WIDTH_SM,
  MAX_WIDTH_XL,
  SECTIONAL_GAP,
} from '../../utils/styleGlobals';
import type { SlideSectionModel } from '../../utils/models/sections/SlideSectionModel';
import ContentContainer from '../ContentContainer';
import HorizontalSlider from '../Sliders/HorizontalSlider';
import AnimationZoomIn from '../Animation/AnimationZoomIn';
import ArrowButton from '../Buttons/ArrowButton';
import StepCard from '../Cards/StepCard';

const ROTATION_VALUES = [4, -2.8, 3, -2.8, 5, -3];
const ROTATION_VALUES_MOBILE = [0.9, -0.4, 0.3, -0.2, 0.7, -0.7];

interface Props {
  data: SlideSectionModel;
}

export default function SlideSection(props: Props) {
  const { data } = props;
  const { heading, body, slides } = data;
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up('md'));
  const { cementGrey } = theme.palette.common;

  const [active, setActive] = useState(0);
  const [maxVisibleSlide, setMaxVisibleSlide] = useState(0);

  const getRotationValue = (index: number) => {
    const rotationValues = isTablet ? ROTATION_VALUES : ROTATION_VALUES_MOBILE;
    const rotationIndex = index % rotationValues.length;
    return rotationValues[rotationIndex];
  };

  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: isTablet ? 0.2 : 0.01,
  });

  return (
    <ContentContainer
      position="relative"
      my={SECTIONAL_GAP}
      maxWidth={MAX_WIDTH_XL}
      color={cementGrey}
    >
      <Stack
        gap={CONTENT_GAP}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        ref={sectionRef}
        mb={{ xs: 6, lg: 8 }}
      >
        {heading && (
          <AnimationZoomIn shouldAnimate={sectionInView}>
            <Typography variant="h2" textAlign="center">
              {heading}
            </Typography>
          </AnimationZoomIn>
        )}
        {body && (
          <AnimationZoomIn shouldAnimate={sectionInView} delay={200}>
            <Typography variant="body1" maxWidth={MAX_WIDTH_SM}>
              {body}
            </Typography>
          </AnimationZoomIn>
        )}
      </Stack>
      <Box component="div" position="relative" my={5}>
        <Stack
          direction="row"
          position="absolute"
          zIndex={2}
          justifyContent="space-between"
          width="100%"
          top="30%"
          sx={{ transform: 'translateY(-50%)', pointerEvents: 'none' }}
        >
          <ArrowButton
            arrow="left"
            onClick={() => setActive(active - 1)}
            disabled={active === 0}
            style={{ pointerEvents: 'auto' }}
          />
          <ArrowButton
            arrow="right"
            onClick={() => setActive(active + 1)}
            disabled={active === maxVisibleSlide}
            style={{ pointerEvents: 'auto' }}
          />
        </Stack>
        <HorizontalSlider
          selected={active}
          setSelected={setActive}
          px={{ xs: 0, md: 4 }}
          spacing={4}
          setMaxVisibleSlide={setMaxVisibleSlide}
        >
          {slides.map((slide, index) => {
            const rotation = getRotationValue(index);
            return (
              <AnimationZoomIn
                shouldAnimate={slides.length < 4 ? sectionInView : undefined}
                delay={200 + index * 100}
                threshold={0.01}
              >
                <StepCard data={slide} rotation={rotation} />
              </AnimationZoomIn>
            );
          })}
        </HorizontalSlider>
      </Box>
    </ContentContainer>
  );
}
