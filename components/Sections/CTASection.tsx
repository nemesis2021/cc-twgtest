import {
  Box,
  Typography,
  Grid,
  useTheme,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { useInView } from 'react-intersection-observer';
import {
  BORDER_RADIUS,
  CONTENT_GAP,
  MAX_WIDTH_SECTION,
  SECTIONAL_GAP,
  SECTIONAL_GAP_LG,
  SECTIONAL_GAP_XL,
  SECTIONAL_GAP_XXXL,
} from '../../utils/styleGlobals';
import Button from '../Buttons/Button';
import AnimatedImage from '../AnimatedImage';
import ContentContainer from '../ContentContainer';
import { CTASectionModel } from '../../utils/models/sections/CTASectionModel';
import AnimationZoomIn from '../Animation/AnimationZoomIn';

interface Props {
  data: CTASectionModel;
}

export default function CTASection(props: Props) {
  const { data } = props;
  const { heading, body, link, image } = data;

  const theme = useTheme();
  const { cementGrey, dirtyWhite } = theme.palette.common;
  const { md, lg } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));

  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: isTablet ? 0.4 : 0.1,
  });

  return (
    <ContentContainer
      my={SECTIONAL_GAP}
      maxWidth={MAX_WIDTH_SECTION}
      mx="auto"
      ref={sectionRef}
      pb={{
        xs: 22,
        lg: SECTIONAL_GAP_LG,
        xl: SECTIONAL_GAP_XL,
        xxxl: SECTIONAL_GAP_XXXL,
      }}
    >
      <Box bgcolor={dirtyWhite} borderRadius={BORDER_RADIUS} component="div">
        <Grid container pt={4}>
          <Grid
            item
            xs={12}
            lg={5}
            color={cementGrey}
            pl={{ xs: 2.5, lg: 10 }}
            pr={2.5}
            display="flex"
            justifyContent={{ xs: 'center', lg: 'flex-start' }}
          >
            <Stack
              direction="column"
              gap={CONTENT_GAP}
              my={{ xs: 3.75, lg: 12 }}
              maxWidth={500}
              textAlign={{ xs: 'center', lg: 'left' }}
              alignItems={{ xs: 'center', lg: 'flex-start' }}
            >
              <AnimationZoomIn shouldAnimate={sectionInView} delay={100}>
                <Typography variant="h2">{heading}</Typography>
              </AnimationZoomIn>
              <AnimationZoomIn shouldAnimate={sectionInView} delay={200}>
                <Typography variant="body1">{body}</Typography>
              </AnimationZoomIn>
              {link && (
                <AnimationZoomIn shouldAnimate={sectionInView} delay={300}>
                  <Button label={link.title} href={link.url} />
                </AnimationZoomIn>
              )}
            </Stack>
          </Grid>
          {image && (
            <Grid item xs={12} lg={7} px={6}>
              <AnimationZoomIn shouldAnimate={sectionInView} delay={400}>
                <Box
                  component="div"
                  mx="auto"
                  mb={-22}
                  borderRadius="100%"
                  width="100%"
                  maxWidth={666}
                  position="relative"
                  sx={{ aspectRatio: 1 }}
                  overflow="hidden"
                >
                  <AnimatedImage
                    src={image?.node.sourceUrl}
                    alt={image.node.altText}
                    sizes={`(max-width: ${lg}px) 90vw, 50vw`}
                  />
                </Box>
              </AnimationZoomIn>
            </Grid>
          )}
        </Grid>
      </Box>
    </ContentContainer>
  );
}
