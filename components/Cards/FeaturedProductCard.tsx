import { Box, Typography, useTheme } from '@mui/material';
import { animated, config, useSpring } from '@react-spring/web';
import { forwardRef } from 'react';
import type { ProductPartialModel } from '../../utils/models/woocommerce/ProductModel';
import { OUR_PRODUCTS_PAGE } from '../../utils/routes';
import { BORDER_RADIUS, CONTENT_GAP } from '../../utils/styleGlobals';
import useGetHoverState from '../../utils/hooks/useGetHoverState';
import WysiwygStyledTypography from '../WysiwygStyledTypography';
import Button from '../Buttons/Button';
import AnimatedImage from '../AnimatedImage';
import AnimationZoomIn from '../Animation/AnimationZoomIn';
import AnimationFadeIn from '../Animation/AnimationFadeIn';

const ABox = animated(Box);

interface Props {
  data: ProductPartialModel;
  rotation: number;
  showImage?: boolean;
}

function FeaturedProductCard(props: Props, ref?: React.Ref<HTMLDivElement>) {
  const { data, rotation, showImage = true } = props;
  const { productFields, databaseId, slug, image } = data;
  const { colors, colorTheme, productCardContent, productDisplayName } =
    productFields;

  const theme = useTheme();
  const { cementGrey, white } = theme.palette.common;
  const { md } = theme.breakpoints.values;

  const { isHovering, hoverBind } = useGetHoverState();

  const cardSpring = useSpring({
    transform: isHovering ? 'rotate(0deg)' : `rotate(${rotation}deg)`,
    config: config.wobbly,
  });

  const shadowCardSpring = useSpring({
    transform: isHovering ? 'rotate(0deg)' : `rotate(${rotation}deg)`,
    y: isHovering ? 6 : 0,
    x: '-50%',
    config: config.wobbly,
  });

  const productImageSpring = useSpring({
    scale: isHovering ? 1.1 : 1,
  });

  return (
    <Box component="div" position="relative">
      <AnimationFadeIn threshold={1}>
        <ABox
          style={shadowCardSpring}
          component="div"
          position="absolute"
          bottom={-6}
          maxWidth={{ xs: '98%', sm: 420, md: 'inherit' }}
          width={{ xs: 418, md: '99%' }}
          height="100%"
          left="50%"
          borderRadius={BORDER_RADIUS}
          bgcolor={colors.primaryColor}
          boxShadow="0px 8px 12px 0px rgba(0, 0, 0, 0.10)"
          sx={{
            transform: `rotate(${rotation}deg)`,
          }}
        />
      </AnimationFadeIn>
      <ABox
        style={cardSpring}
        {...hoverBind()}
        component="div"
        borderRadius={BORDER_RADIUS}
        textAlign="center"
        sx={{
          transform: `rotate(${rotation}deg)`,
        }}
        p={CONTENT_GAP}
        key={databaseId}
        maxWidth={{ xs: 420, md: 'inherit' }}
        width={{ md: 380, lg: 440, xl: 460, xxl: 480, xxxl: 500 }}
        mx="auto"
      >
        <Box
          component="div"
          position="absolute"
          width="100%"
          height="100%"
          left={0}
          top={0}
          borderRadius={BORDER_RADIUS}
          overflow="hidden"
        >
          <AnimationZoomIn
            threshold={0.1}
            style={{ width: '100%', height: '100%' }}
          >
            <ABox
              width="100%"
              height="100%"
              component="div"
              sx={{
                background: `radial-gradient(50% 50% at 50% 50%, ${white} 0%, ${colors.secondaryColor} 100%)`,
              }}
            />
          </AnimationZoomIn>
        </Box>

        <Box component="div" position="relative" zIndex={1}>
          {showImage ? (
            <AnimationZoomIn threshold={1}>
              <ABox
                component="div"
                height={{ xs: theme.spacing(22.37), md: '22.6vh' }}
                ref={ref}
                mx="auto"
                position="relative"
                style={productImageSpring}
                mt={{ lg: 3 }}
              >
                {showImage && (
                  <AnimatedImage
                    src={image?.sourceUrl}
                    alt={image?.altText}
                    sizes={`(max-width: ${md}px) 50vw, 35vw`}
                    objectFit="contain"
                  />
                )}
              </ABox>
            </AnimationZoomIn>
          ) : (
            <Box
              component="div"
              height={{ xs: theme.spacing(22.37), md: '22.4vh' }}
              ref={ref}
              mx="auto"
              position="relative"
              mt={{ lg: 3 }}
            />
          )}

          <AnimationZoomIn delay={150}>
            <Typography
              variant="h4"
              color={colors.primaryColor}
              pt={4.25}
              pb={3}
            >
              {productDisplayName.shortName}
            </Typography>
            <Typography variant="caption" color={colors.primaryColor} pb={2.5}>
              {productCardContent.caption}
            </Typography>
            <WysiwygStyledTypography
              text={productCardContent.description}
              typographyVariant="body2"
              pb={4.25}
              color={cementGrey}
            />

            <Button
              label="Learn More"
              href={`${OUR_PRODUCTS_PAGE}/${slug}`}
              variant={colorTheme}
            />
          </AnimationZoomIn>
        </Box>
      </ABox>
    </Box>
  );
}

export default forwardRef<HTMLDivElement, Props>(FeaturedProductCard);
