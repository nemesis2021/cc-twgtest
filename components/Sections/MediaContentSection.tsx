import {
  Box,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import type { MediaContentSectionModel } from '../../utils/models/sections/MediaContentSectionModel';
import WysiwygStyledTypography from '../WysiwygStyledTypography';
import ContentContainer from '../ContentContainer';
import {
  BORDER_RADIUS,
  MAX_WIDTH_SECTION,
  SECTIONAL_GAP,
} from '../../utils/styleGlobals';
import Video from '../Video';
import AnimatedImage from '../AnimatedImage';
import Button from '../Buttons/Button';
import AnimationZoomIn from '../Animation/AnimationZoomIn';

interface Props {
  data: MediaContentSectionModel;
  variant?: 1 | 2;
}

export default function MediaContentSection(props: Props) {
  const { data, variant = 1 } = props;
  const {
    heading,
    body,
    smallImage,
    image,
    video,
    videoLink,
    link,
    mediaPosition = '2',
    smallText,
  } = data;
  const theme = useTheme();
  const { cementGrey, primaryGreen } = theme.palette.common;
  const { md } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));

  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: isTablet ? 0.4 : 0.1,
  });

  // Handle mediaPosition whether it's a string or array
  const getMediaPosition = () => {
    if (Array.isArray(mediaPosition)) {
      return mediaPosition[0] || '2';
    }
    return mediaPosition;
  };

  const resolvedMediaPosition = getMediaPosition();

  const renderMedia = () => {
    if (videoLink) {
      return (
        <Video
          video={{
            url: videoLink,
          }}
          fallbackImage={image || undefined}
        />
      );
    }
    if (video) {
      return (
        <Video
          video={{
            url: video.node.mediaItemUrl,
          }}
          fallbackImage={image || undefined}
        />
      );
    }
    if (image) {
      return (
        <AnimatedImage
          src={image.node.sourceUrl}
          alt={image.node.altText}
          sizes={`(max-width: ${md}px) 60vw, 95vw`}
        />
      );
    }
    return null;
  };

  const formatHeading = useMemo(() => {
    if (!heading) return '';

    const newHeading = heading.split(/(®)/g).map((part) =>
      part === '®' ? (
        <span
          style={{
            fontSize: '60%',
            transform: 'translateY(-25%)',
            display: 'inline-block',
          }}
        >
          {part}
        </span>
      ) : (
        part
      ),
    );

    return newHeading;
  }, [heading]);

  return (
    <ContentContainer
      ref={sectionRef}
      maxWidth={MAX_WIDTH_SECTION}
      mx="auto"
      position="relative"
      my={SECTIONAL_GAP}
    >
      <Grid container spacing={6.25}>
        {(videoLink || video || image) && (
          <Grid
            item
            xs={12}
            md={7.5}
            order={resolvedMediaPosition === '2' ? 2 : 1}
          >
            <Box
              component="div"
              key={`image_${image?.node.altText || 'video'}`}
              width="100%"
              height={{ xs: '62.93vw', md: '41.52vw' }}
              maxHeight={{ xs: 267, md: 615 }}
              position="relative"
              borderRadius={BORDER_RADIUS}
              overflow="hidden"
            >
              {renderMedia()}
            </Box>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          md={4.5}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          order={resolvedMediaPosition === '2' && isTablet ? 1 : 2}
          color={cementGrey}
        >
          <Stack direction="column" gap={4.7}>
            {smallImage && (
              <AnimationZoomIn shouldAnimate={sectionInView} delay={100}>
                <Box
                  component="div"
                  width={{ xs: 88, md: 137 }}
                  height={{ xs: 68, md: 106 }}
                  position="relative"
                >
                  <AnimatedImage
                    src={smallImage.node.sourceUrl}
                    alt={smallImage.node.altText}
                    sizes="25vw"
                    objectFit="contain"
                  />
                </Box>
              </AnimationZoomIn>
            )}

            {heading && (
              <AnimationZoomIn shouldAnimate={sectionInView} delay={200}>
                <Typography
                  variant={variant === 1 ? 'h2' : 'h3'}
                  color={variant === 1 ? cementGrey : primaryGreen}
                >
                  {formatHeading}
                </Typography>
              </AnimationZoomIn>
            )}
            {body && (
              <AnimationZoomIn shouldAnimate={sectionInView} delay={300}>
                <WysiwygStyledTypography
                  typographyVariant="body1"
                  text={body ?? ''}
                />
              </AnimationZoomIn>
            )}

            {link && (
              <AnimationZoomIn shouldAnimate={sectionInView} delay={500}>
                <Button label={link.title} href={link.url} />
              </AnimationZoomIn>
            )}

            {smallText && (
              <AnimationZoomIn shouldAnimate={sectionInView} delay={300}>
                <WysiwygStyledTypography
                  mt={2}
                  typographyVariant="body3"
                  text={smallText}
                />
              </AnimationZoomIn>
            )}
          </Stack>
        </Grid>
      </Grid>
    </ContentContainer>
  );
}
