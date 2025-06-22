import { Typography, useTheme, useMediaQuery, Stack } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { ElfsightWidget } from 'react-elfsight-widget';
import ContentContainer from '../ContentContainer';
import type { InstagramSectionModel } from '../../utils/models/sections/InstagramSectionModel';
import { SECTIONAL_GAP } from '../../utils/styleGlobals';
import Button from '../Buttons/Button';
import AnimationZoomIn from '../Animation/AnimationZoomIn';
import AnimatedBackgroundWrapper from '../AnimatedBackgroundWrapper';

interface Props {
  data: InstagramSectionModel;
}

export default function InstagramSection(props: Props) {
  const { data } = props;
  const { caption, heading, link, widgetId } = data;
  const theme = useTheme();
  const { primaryGreen, cementGrey, white } = theme.palette.common;
  const { md } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));

  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: isTablet ? 0.4 : 0.1,
  });

  return (
    <AnimatedBackgroundWrapper color={white}>
      <ContentContainer ref={sectionRef} mt={SECTIONAL_GAP}>
        <AnimationZoomIn
          shouldAnimate={sectionInView}
          style={{ width: 'fit-content' }}
        >
          <Typography variant="label" color={cementGrey}>
            {caption}
          </Typography>
        </AnimationZoomIn>

        <Stack direction="row" justifyContent="space-between">
          <AnimationZoomIn shouldAnimate={sectionInView} delay={200}>
            <Typography variant="h2" color={primaryGreen}>
              {heading}
            </Typography>
          </AnimationZoomIn>
          <AnimationZoomIn shouldAnimate={sectionInView} delay={400}>
            {link && isTablet && (
              <Button
                label={link?.title}
                href={link?.url}
                target={link?.target}
              />
            )}
          </AnimationZoomIn>
        </Stack>
      </ContentContainer>
      <ContentContainer
        mb={SECTIONAL_GAP}
        pt={6}
        minHeight={{
          xs: 362,
          sm: 412,
          md: 370,
          lg: 309,
          xl: 304,
          xxl: 320,
          xxxl: 317,
        }}
      >
        {sectionInView && <ElfsightWidget widgetId={widgetId} lazy />}
      </ContentContainer>
    </AnimatedBackgroundWrapper>
  );
}
