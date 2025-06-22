import { useEffect, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import ContentContainer from '../../ContentContainer';
import useBoundingClientRect from '../../../utils/hooks/useBoundingClientRect';
import OurProductsScene from '../../R3F/OurProductsScene';
import ProductStage from './ProductStage';
import { OurProductsSectionModel } from '../../../utils/models/pages/StagesPageModel';

interface Props {
  data: OurProductsSectionModel;
}

export default function OurProductsSection(props: Props) {
  const { data } = props;
  const { products } = data;
  const [canvasReady, setCanvasReady] = useState(false);
  const { ref: containerRef, rect: containerRect } = useBoundingClientRect({
    forceUpdate: canvasReady,
  });
  const [sectionHeights, setSectionHeights] = useState<number[]>([]);
  const [offset, setOffset] = useState(0);
  const [wrapper, setWrapper] = useState(
    products.nodes[0].productFields.wrapper,
  );

  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    if (containerRect) {
      const yPos = containerRect.top + window.scrollY;

      const offsetPos = yPos;

      setOffset(offsetPos);
    }
  }, [containerRect, containerRef, setOffset]);

  return (
    <Box component="div" id="products" ref={containerRef} position="relative">
      {isTablet && (
        <OurProductsScene
          sectionHeights={sectionHeights}
          wrapper={wrapper}
          setCanvasReady={setCanvasReady}
          canvasReady={canvasReady}
          offset={offset}
        />
      )}
      <ContentContainer>
        {products.nodes.map((product, index) => (
          <ProductStage
            data={product}
            setSectionHeights={setSectionHeights}
            sectionIndex={index}
            setWrapper={() => setWrapper(product.productFields.wrapper)}
          />
        ))}
      </ContentContainer>
    </Box>
  );
}
