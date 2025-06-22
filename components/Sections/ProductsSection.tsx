import { Dispatch, SetStateAction, useEffect } from 'react';
import { useIsomorphicLayoutEffect } from '@react-spring/web';
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import useBoundingClientRect from '../../utils/hooks/useBoundingClientRect';
import useResizeObserver from '../../utils/hooks/useResizeObserver';
import ContentContainer from '../ContentContainer';
import { SECTIONAL_GAP_LARGE } from '../../utils/styleGlobals';
import type { ProductSectionModel } from '../../utils/models/sections/ProductSectionModel';
import useWindowDimentions from '../../utils/hooks/useWindowDimentions';
import AnimationZoomIn from '../Animation/AnimationZoomIn';
import FeaturedProductCard from '../Cards/FeaturedProductCard';

const ROTATION_VALUES = [1, -2];
const ROTATION_VALUES_MOBILE = [-0.1, 0.1];

interface Props {
  sectionIndex?: number;
  setSectionHeights?: Dispatch<SetStateAction<number[]>>;
  data: ProductSectionModel;
  canvasReady?: boolean;
  featuredProductId?: number;
  handleSetScrollPoint?: (x: number, y: number) => void;
}

export default function ProductsSection(props: Props) {
  const {
    sectionIndex,
    setSectionHeights,
    data,
    canvasReady,
    featuredProductId,
    handleSetScrollPoint,
  } = props;
  const { ref: endRef, rect } = useBoundingClientRect({
    forceUpdate: canvasReady,
  });
  const { ref: containerRef, clientHeight, clientWidth } = useResizeObserver();
  const { innerHeight } = useWindowDimentions();

  useIsomorphicLayoutEffect(() => {
    if (!endRef.current || typeof window === 'undefined') {
      return;
    }

    if (rect) {
      const yPos = rect.bottom - rect.height / 2;
      const end = yPos + window.scrollY;
      const xPos = rect.left + rect.width / 2;

      if (handleSetScrollPoint) {
        handleSetScrollPoint(xPos, end);
      }
    }
  }, [rect, endRef, innerHeight, clientWidth]);

  useEffect(() => {
    if (typeof sectionIndex === 'number' && setSectionHeights) {
      setSectionHeights((heights) => {
        const currentHeights = [...heights];
        currentHeights[sectionIndex] = clientHeight;
        return currentHeights;
      });
    }
  }, [clientHeight, sectionIndex, setSectionHeights]);

  const theme = useTheme();
  const { primaryGreen } = theme.palette.common;
  const { md } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));

  const getRotationValue = (index: number) => {
    const rotationValues = isTablet ? ROTATION_VALUES : ROTATION_VALUES_MOBILE;
    return rotationValues[index % rotationValues.length];
  };

  return (
    <ContentContainer
      my={SECTIONAL_GAP_LARGE}
      display="flex"
      alignItems="center"
      ref={containerRef}
      maxWidth={1560}
    >
      <Box component="div" width="100%" textAlign="center">
        {isTablet && (
          <AnimationZoomIn>
            <Typography variant="h2" pb={6.25} color={primaryGreen}>
              {data.heading}
            </Typography>
          </AnimationZoomIn>
        )}

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="center"
          gap={{ xs: 5, md: 2.5 }}
        >
          {data.products.nodes.length > 0 &&
            data.products.nodes.map((product, index) => {
              const isFeaturedProduct: boolean =
                product.databaseId === featuredProductId;
              const showImage: boolean = !isTablet || !isFeaturedProduct;
              const rotation = getRotationValue(index);
              return (
                <div>
                  <FeaturedProductCard
                    rotation={rotation}
                    data={product}
                    ref={isFeaturedProduct ? endRef : undefined}
                    showImage={showImage}
                  />
                </div>
              );
            })}
        </Stack>
      </Box>
    </ContentContainer>
  );
}
