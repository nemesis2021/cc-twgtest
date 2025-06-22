import { Dispatch, SetStateAction, useEffect } from 'react';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import useResizeObserver from '../../../utils/hooks/useResizeObserver';
import type { ProductModel } from '../../../utils/models/woocommerce/ProductModel';
import AnimatedImage from '../../AnimatedImage';
import AnimationZoomIn from '../../Animation/AnimationZoomIn';

import ProductInfoCard from '../../Cards/ProductInfoCard';

interface Props {
  sectionIndex: number;
  data: ProductModel;
  setSectionHeights: Dispatch<SetStateAction<number[]>>;
  setWrapper: () => void;
}

export default function ProductStage(props: Props) {
  const { data, setSectionHeights, sectionIndex, setWrapper } = props;
  const { productFields, image } = data;
  const { colors } = productFields;
  const { ref: containerRef, clientHeight: containerHeight } =
    useResizeObserver();
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5, // 50% of viewport
  });

  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const isMobile = useMediaQuery(theme.breakpoints.down(md));

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
        component="div"
        ref={containerRef}
        minHeight={{ xs: 'max-content', md: '100vh' }}
        display="flex"
        alignItems="center"
        py={4}
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
              <ProductInfoCard data={data} />
            </AnimationZoomIn>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
