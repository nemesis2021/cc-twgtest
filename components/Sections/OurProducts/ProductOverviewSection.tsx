import { Dispatch, SetStateAction, useEffect } from 'react';
import {
  alpha,
  Box,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { ProductPartialModel } from '../../../utils/models/woocommerce/ProductModel';
import useResizeObserver from '../../../utils/hooks/useResizeObserver';
import WysiwygStyledTypography from '../../WysiwygStyledTypography';
import AnimatedDivider from '../../AnimatedDivider';
import Button from '../../Buttons/Button';
import AnimatedImage from '../../AnimatedImage';
import AnimationZoomIn from '../../Animation/AnimationZoomIn';
import { NAV_HEIGHT_XS, SECTIONAL_GAP } from '../../../utils/styleGlobals';
import { OUR_PRODUCTS_PAGE } from '../../../utils/routes';
import { ColorTheme } from '../../../utils/models/ColorTheme';

interface Props {
  sectionIndex: number;
  data: ProductPartialModel;
  setSectionHeights: Dispatch<SetStateAction<number[]>>;
  setWrapper: () => void;
  isLast: boolean;
  nextProductSlug?: string;
}

export default function ProductOverviewSection(props: Props) {
  const {
    data,
    setSectionHeights,
    sectionIndex,
    setWrapper,
    isLast,
    nextProductSlug,
  } = props;
  const { productFields, slug, image } = data;
  const { colors, colorTheme, productOverview, productDisplayName } =
    productFields;
  const { longName } = productDisplayName;
  const { description, productOverviewContents } = productOverview;
  const { ref: containerRef, clientHeight: containerHeight } =
    useResizeObserver();
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5, // 50% of viewport
  });

  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const isMobile = useMediaQuery(theme.breakpoints.down(md));
  const { cementGrey, white, black } = theme.palette.common;

  const handleScrollToNext = () => {
    if (typeof window !== 'undefined' && nextProductSlug) {
      const targetEl = document.getElementById(nextProductSlug);
      const rect = targetEl?.getBoundingClientRect();
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      const offset = isMobile ? NAV_HEIGHT_XS + 100 : 0;

      if (rect) {
        window.scrollTo({
          top: rect.top + currentScrollPosition - offset,
          behavior: 'smooth',
        });
      }
    }
  };

  useEffect(() => {
    setSectionHeights((heights) => {
      heights[sectionIndex] = containerHeight;

      return heights;
    });
  }, [containerHeight, setSectionHeights, sectionIndex]);

  useEffect(() => {
    if (inView) {
      setWrapper();
      document.body.style.backgroundColor = colors.secondaryColor;
    }
  }, [inView, setWrapper, colors]);

  return (
    <div ref={inViewRef}>
      <Box
        id={slug}
        component="div"
        ref={containerRef}
        minHeight={{ xs: 'max-content', md: '100vh' }}
        display="flex"
        alignItems="center"
        py={SECTIONAL_GAP}
      >
        <Grid container alignItems="center">
          <Grid item xs={12} md={5}>
            {isMobile && (
              <Box
                component="div"
                position="relative"
                width="76.53vw"
                height="104vw"
                mx="auto"
                mb={6.25}
              >
                <AnimatedImage
                  src={image?.sourceUrl}
                  alt={image?.altText}
                  sizes="100vw"
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={7}>
            <AnimationZoomIn threshold={0.1}>
              <Box
                component="div"
                bgcolor={white}
                sx={{ boxShadow: `0px 4px 10px 0px ${alpha(black, 0.15)}` }}
                py={{ xs: 3.75, md: 6.25 }}
                px={{ xs: 2.5, md: 6.25 }}
                borderRadius="30px"
                borderBottom={`4px solid ${colors.primaryColor}`}
              >
                <Box component="div">
                  <Typography
                    variant="h2"
                    color={colors.primaryColor}
                    pb={3.75}
                  >
                    {longName}
                  </Typography>
                  <WysiwygStyledTypography
                    text={description || ''}
                    typographyVariant="body2"
                    pb={4.25}
                    color={cementGrey}
                  />
                </Box>

                <AnimatedDivider />
                {productOverviewContents && (
                  <Stack rowGap={5} my={5}>
                    {productOverviewContents.map((productContent) => (
                      <Box component="div">
                        <Typography
                          variant="h5"
                          color={colors.primaryColor}
                          pb={2}
                        >
                          {productContent.title}
                        </Typography>
                        <WysiwygStyledTypography
                          text={productContent.body || ''}
                          color={cementGrey}
                        />
                      </Box>
                    ))}
                  </Stack>
                )}
                <Stack direction={{ xs: 'column', md: 'row' }} gap={1.25}>
                  <Button
                    label="Learn More"
                    href={`${OUR_PRODUCTS_PAGE}/${slug}`}
                    variant={colorTheme || 'primaryGreen'}
                    width={isMobile ? '100%' : 'fit-content'}
                  />

                  {!isLast && (
                    <Button
                      label="Scroll to Next Stage"
                      variant={
                        colorTheme
                          ? (`${colorTheme}Border` as ColorTheme)
                          : 'primaryGreenBorder'
                      }
                      onClick={() => handleScrollToNext()}
                      width={isMobile ? '100%' : 'fit-content'}
                    />
                  )}
                </Stack>
              </Box>
            </AnimationZoomIn>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
