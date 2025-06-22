import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import {
  CONTENT_GAP,
  MAX_WIDTH_SM,
  MAX_WIDTH_XL,
  SECTIONAL_GAP_LARGE,
} from '../../utils/styleGlobals';
import type { TestimonialModel } from '../../utils/models/customPostTypes/TestimonialModel';
import type { TestimonialsSectionModel } from '../../utils/models/sections/TestimonialsSectionModel';
import ContentContainer from '../ContentContainer';
import AnimationZoomIn from '../Animation/AnimationZoomIn';
import TestimonialCard from '../Cards/TestimonialCard';

import HorizontalSliderInfinite from '../Sliders/HorizontalSliderInfinite';
import ArrowButton from '../Buttons/ArrowButton';

const ROTATION_VALUES = [5.53, -2.8, 4, -2.8, 5, -3];
const ROTATION_VALUES_MOBILE = [0.9, -0.4, 0.3, -0.2, 0.7, -0.7];

interface Props {
  testimonials: TestimonialModel[];
  data: TestimonialsSectionModel;
}

export default function TestimonialsSection(props: Props) {
  const { testimonials, data } = props;
  const { heading, body } = data;
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up('md'));
  const { cementGrey } = theme.palette.common;

  const [active, setActive] = useState(0);

  const getRotationValue = (index: number) => {
    const rotationValues = isTablet ? ROTATION_VALUES : ROTATION_VALUES_MOBILE;
    const rotationIndex = index % rotationValues.length;
    return rotationValues[rotationIndex];
  };

  return (
    <ContentContainer
      position="relative"
      my={SECTIONAL_GAP_LARGE}
      maxWidth={MAX_WIDTH_XL}
      color={cementGrey}
    >
      <Stack
        gap={CONTENT_GAP}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        {heading && (
          <AnimationZoomIn>
            <Typography variant="h2" textAlign="center">
              {heading}
            </Typography>
          </AnimationZoomIn>
        )}
        {body && (
          <AnimationZoomIn threshold={0.2} delay={200}>
            <Typography variant="body1" maxWidth={MAX_WIDTH_SM}>
              {body}
            </Typography>
          </AnimationZoomIn>
        )}

        <Stack direction="row" spacing={3.75} justifyContent="center">
          <ArrowButton arrow="left" onClick={() => setActive(active - 1)} />
          <ArrowButton arrow="right" onClick={() => setActive(active + 1)} />
        </Stack>
      </Stack>
      <Box component="div" py={{ xs: 4, md: 5.7 }}>
        <HorizontalSliderInfinite
          selected={active}
          setSelected={setActive}
          px={{ xs: 0, md: 4 }}
          spacing={22}
        >
          {testimonials.map((testimonial, index) => {
            const rotation = getRotationValue(index);
            return (
              <TestimonialCard
                data={testimonial.testimonialPostType}
                rotation={rotation}
              />
            );
          })}
        </HorizontalSliderInfinite>
      </Box>
    </ContentContainer>
  );
}
