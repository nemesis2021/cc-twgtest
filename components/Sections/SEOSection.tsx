import { Typography, useTheme, useMediaQuery } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import ContentContainer from '../ContentContainer';
import type { SeoSectionModel } from '../../utils/models/sections/SeoSectionModel';
import { SECTIONAL_GAP } from '../../utils/styleGlobals';
import AnimationZoomIn from '../Animation/AnimationZoomIn';
import WysiwygStyledTypography from '../WysiwygStyledTypography';
import AnimationFadeIn from '../Animation/AnimationFadeIn';

interface Props {
  data: SeoSectionModel;
}

export default function SEOSection(props: Props) {
  const { data } = props;
  const { heading, body } = data;
  const theme = useTheme();
  const { cementGrey } = theme.palette.common;
  const { md } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));

  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: isTablet ? 0.4 : 0.01,
  });

  return (
    <ContentContainer ref={sectionRef} my={SECTIONAL_GAP} color={cementGrey}>
      {heading && (
        <AnimationZoomIn
          shouldAnimate={sectionInView}
          delay={100}
          style={{ width: 'fit-content' }}
        >
          <Typography variant="h4" mb={2.5}>
            {heading}
          </Typography>
        </AnimationZoomIn>
      )}

      {body && (
        <AnimationFadeIn shouldAnimate={sectionInView} delay={300}>
          <WysiwygStyledTypography text={body} />
        </AnimationFadeIn>
      )}
    </ContentContainer>
  );
}
