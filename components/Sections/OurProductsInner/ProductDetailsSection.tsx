import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { ProductModel } from '../../../utils/models/woocommerce/ProductModel';
import {
  NAV_HEIGHT_MD,
  NAV_HEIGHT_XS,
  SECTIONAL_GAP,
} from '../../../utils/styleGlobals';
import BreadCrumbs from '../../Breadcrumbs';
import ContentContainer from '../../ContentContainer';
import ImageGallery from '../../ImageGallery';
import AnimatedImage from '../../AnimatedImage';
import useResizeObserver from '../../../utils/hooks/useResizeObserver';
import ProductInnerCanView from '../../R3F/Views/ProductInnerCanView';
import ParallaxContainer from '../../Animation/Parallax/ParallaxContainer';
import ProductInforCard from '../../Cards/ProductInfoCard';
import useResizeObserverCallback from '../../../utils/hooks/useResizeObserverCallback';

interface Props {
  data: ProductModel;
  onHeight: (v: number) => void;
  canvasReady?: boolean;
  selectedGallery: number;
  setSelectedGallery: Dispatch<SetStateAction<number>>;
  sectionHeights: number[];
}

export default function ProductDetailsSection(props: Props) {
  const {
    data,
    onHeight,
    canvasReady = false,
    sectionHeights,
    selectedGallery,
    setSelectedGallery,
  } = props;
  const { galleryImages, productFields } = data;
  const { colorTheme, tag, wrapper } = productFields;
  const { ref: columnRef, clientHeight: columnHeight } = useResizeObserver();
  const { ref: contentRef, clientHeight: contentHeight } = useResizeObserver();

  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));

  const { ref: containerRef } = useResizeObserverCallback({ onHeight });

  let parallaxEnd = contentHeight - columnHeight;
  if (parallaxEnd < 0) {
    parallaxEnd = 0;
  }

  return (
    <ContentContainer pb={SECTIONAL_GAP} ref={containerRef}>
      <BreadCrumbs
        pt={{ xs: NAV_HEIGHT_XS, md: NAV_HEIGHT_MD }}
        pb={2.5}
        displayHome
        currentPageTitle={data.name}
        sx={{ zIndex: 2, position: 'relative' }}
      />

      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <ParallaxContainer
            sticky={{ start: 0, end: isTablet ? parallaxEnd : 0 }}
            offset={isTablet ? -150 : 0}
          >
            <Box component="div" position="relative" ref={columnRef}>
              {tag && (
                <Box
                  component="div"
                  position="absolute"
                  top={-1}
                  right={{ xs: 0, md: theme.spacing(3.75) }}
                  zIndex={2}
                >
                  <Box
                    component="div"
                    position="relative"
                    width={{ xs: 88, md: 99 }}
                    height={{ xs: 68, md: 77 }}
                  >
                    <AnimatedImage
                      src={tag.node.sourceUrl}
                      alt={tag.node.altText}
                      sizes={`(max-width: ${md}px) 30vw, 15vw`}
                      objectFit="contain"
                    />
                  </Box>
                </Box>
              )}
              {galleryImages.nodes.length > 0 && (canvasReady || !isTablet) && (
                <ImageGallery
                  data={galleryImages}
                  colorTheme={colorTheme}
                  currIndex={selectedGallery}
                  setCurrIndex={setSelectedGallery}
                  r3fElement={
                    <ProductInnerCanView
                      wrapper={wrapper}
                      sectionHeights={sectionHeights!}
                      canvasReady={canvasReady}
                      offset={parallaxEnd}
                      visible={selectedGallery === 0}
                    />
                  }
                />
              )}
            </Box>
          </ParallaxContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductInforCard
            data={data}
            link={data.productFields.link}
            ref={contentRef}
          />
        </Grid>
      </Grid>
    </ContentContainer>
  );
}
