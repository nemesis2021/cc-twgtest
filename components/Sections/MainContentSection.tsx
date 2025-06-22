import {
  Box,
  Typography,
  useTheme,
  Stack,
  useMediaQuery,
  BoxProps,
  TypographyProps,
} from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { CSSProperties, PropsWithChildren, PropsWithoutRef } from 'react';
import { MAX_WIDTH_SM, SECTIONAL_GAP } from '../../utils/styleGlobals';
import Button from '../Buttons/Button';
import AnimatedImage from '../AnimatedImage';
import ContentContainer, { ContentContainerProps } from '../ContentContainer';
import type { MainContentSectionModel } from '../../utils/models/sections/MainContentSectionModel';
import AnimationZoomIn from '../Animation/AnimationZoomIn';
import WysiwygStyledTypography from '../WysiwygStyledTypography';

interface Props extends ContentContainerProps, BoxProps {
  data: MainContentSectionModel;
  headingColor?: CSSProperties['color'];
  headingVariant?: TypographyProps['variant'];
}

export default function MainContentSection(
  props: PropsWithoutRef<PropsWithChildren<Props>>,
) {
  const { data, headingColor, children, headingVariant, ...restProps } = props;
  const { images, heading, body, link } = data;

  const theme = useTheme();
  const { cementGrey } = theme.palette.common;
  const { md } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));

  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: isTablet ? 0.4 : 0.1,
  });

  return (
    <Stack component="div" my={SECTIONAL_GAP} {...restProps} ref={sectionRef}>
      {images?.nodes && images.nodes.length > 0 && (
        <Stack direction="row" justifyContent="center" alignItems="flex-end">
          {images.nodes[0] && (
            <AnimationZoomIn shouldAnimate={sectionInView}>
              <Box
                component="div"
                width={{ xs: 75, md: 129 }}
                height={{ xs: 84, md: 144 }}
                position="relative"
              >
                <AnimatedImage
                  src={images.nodes[0].sourceUrl || '/images/toy1.png'}
                  alt={images.nodes[0].altText || 'CapriCare toy 1'}
                  sizes={`(max-width: ${md}px) 20vw, 9vw`}
                  objectFit="contain"
                />
              </Box>
            </AnimationZoomIn>
          )}
          {images.nodes[1] && (
            <AnimationZoomIn shouldAnimate={sectionInView} delay={200}>
              <Box
                component="div"
                width={{ xs: 182, md: 310 }}
                height={{ xs: 139, md: 236 }}
                position="relative"
              >
                <AnimatedImage
                  src={images.nodes[1].sourceUrl || '/images/toy2.png'}
                  alt={images.nodes[1].altText || 'CapriCare toy 2'}
                  sizes={`(max-width: ${md}px) 25vw, 24vw`}
                  objectFit="contain"
                />
              </Box>
            </AnimationZoomIn>
          )}
          {images.nodes[2] && (
            <AnimationZoomIn shouldAnimate={sectionInView} delay={300}>
              <Box
                component="div"
                width={{ xs: 74, md: 125 }}
                height={{ xs: 95, md: 163 }}
                position="relative"
              >
                <AnimatedImage
                  src={images.nodes[2].sourceUrl || '/images/toy3.png'}
                  alt={images.nodes[2].altText || 'CapriCare toy 3'}
                  sizes={`(max-width: ${md}px) 20vw, 9vw`}
                  objectFit="contain"
                />
              </Box>
            </AnimationZoomIn>
          )}
        </Stack>
      )}
      <ContentContainer mx="auto" textAlign="center">
        <AnimationZoomIn shouldAnimate={sectionInView} delay={400}>
          <Typography
            variant={headingVariant || 'h2'}
            mt={3.75}
            color={headingColor || cementGrey}
          >
            {heading}
          </Typography>
        </AnimationZoomIn>
      </ContentContainer>

      <ContentContainer
        maxWidth={MAX_WIDTH_SM}
        mx="auto"
        color={cementGrey}
        textAlign="center"
      >
        <AnimationZoomIn shouldAnimate={sectionInView} delay={500}>
          <WysiwygStyledTypography
            typographyVariant="body1"
            mt={3.75}
            mb={7.5}
            text={body ?? ''}
          />
        </AnimationZoomIn>
        {link && (
          <AnimationZoomIn shouldAnimate={sectionInView} delay={700}>
            <Button label={link.title} href={link.url} />
          </AnimationZoomIn>
        )}
      </ContentContainer>
      <ContentContainer>{children && children}</ContentContainer>
    </Stack>
  );
}
