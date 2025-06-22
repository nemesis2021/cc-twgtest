import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import AnimationZoomIn from '../Animation/AnimationZoomIn';
import ContentContainer from '../ContentContainer';
import Button from '../Buttons/Button';
import HorizontalSlider from '../Sliders/HorizontalSlider';
import ArrowButton from '../Buttons/ArrowButton';
import { SECTIONAL_GAP } from '../../utils/styleGlobals';
import { PublicationSectionModel } from '../../utils/models/sections/PublicationsSectionModel';
import PublicationCard from '../Cards/PublicationCard';

interface Props {
  data: PublicationSectionModel;
}

export default function PublicationSliderSection(props: Props) {
  const { data } = props;
  const { heading, link, publications } = data;
  const [selected, setSelected] = useState(0);
  const [maxVisibleSlide, setMaxVisibleSlide] = useState(0);

  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));
  const { cementGrey } = theme.palette.common;

  return (
    <ContentContainer my={SECTIONAL_GAP}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'baseline', md: 'center' }}
        pb={6.25}
      >
        {heading && (
          <AnimationZoomIn>
            <Typography variant="h2" color={cementGrey}>
              {heading}
            </Typography>
          </AnimationZoomIn>
        )}

        {link && isTablet && <Button label={link.title} href={link.url} />}
      </Stack>

      <Box component="div" position="relative">
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
            onClick={() => setSelected(selected - 1)}
            disabled={selected === 0}
            style={{ pointerEvents: 'auto' }}
          />
          <ArrowButton
            arrow="right"
            onClick={() => setSelected(selected + 1)}
            disabled={selected === maxVisibleSlide}
            style={{ pointerEvents: 'auto' }}
          />
        </Stack>
        <HorizontalSlider
          selected={selected}
          setSelected={setSelected}
          setMaxVisibleSlide={setMaxVisibleSlide}
        >
          {publications.nodes.map((publication) => (
            <PublicationCard data={publication} />
          ))}
        </HorizontalSlider>
      </Box>

      {link && !isTablet && (
        <Button
          label={link.title}
          href={link.url}
          style={{ marginTop: 30 }}
          width="100%"
        />
      )}
    </ContentContainer>
  );
}
