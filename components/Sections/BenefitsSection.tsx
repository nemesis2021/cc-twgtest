import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import { CSSProperties } from 'react';
import { useInView } from 'react-intersection-observer';
import { SECTIONAL_GAP } from '../../utils/styleGlobals';
import ContentContainer from '../ContentContainer';
import WysiwygStyledTypography from '../WysiwygStyledTypography';
import AnimatedImage from '../AnimatedImage';
import BenefitArrow1 from '../../assets/icons/BenefitArrows/BenefitArrow1.svg';
import BenefitArrow2 from '../../assets/icons/BenefitArrows/BenefitArrow2.svg';
import BenefitArrow3 from '../../assets/icons/BenefitArrows/BenefitArrow3.svg';
import BenefitArrow4 from '../../assets/icons/BenefitArrows/BenefitArrow4.svg';
import AnimationZoomIn from '../Animation/AnimationZoomIn';
import { ListItemModel } from '../../utils/models/woocommerce/ProductModel';
import { ImageModelWithoutNode } from '../../utils/models/ImageModel';
import useResizeObserverCallback from '../../utils/hooks/useResizeObserverCallback';

const ABox = animated(Box);

interface BenefitItemProps {
  benefit: ListItemModel;
  inView: boolean;
  delay: number;
  align?: 'left' | 'right';
  imageSize: {
    xs: string;
    md: string;
  };
  children?: React.ReactNode;
}

function BenefitItem(props: BenefitItemProps) {
  const { benefit, inView, delay, align = 'left', imageSize, children } = props;

  const theme = useTheme();
  const { primaryGreen } = theme.palette.common;
  return (
    <AnimationZoomIn shouldAnimate={inView} delay={delay}>
      {children}
      <Box
        component="div"
        width={imageSize}
        height={imageSize}
        position="relative"
        mx={{ xs: 'auto', md: 'unset' }}
        ml={{ md: align === 'right' ? 'auto' : 'unset' }}
        mr={{ md: align === 'left' ? 'auto' : 'unset' }}
      >
        <AnimatedImage
          src={benefit.image.node.sourceUrl}
          alt={benefit.image.node.altText}
          sizes="25vw"
        />
      </Box>
      <Typography
        variant="h4"
        color={primaryGreen}
        py={2}
        maxWidth={{ lg: 300, xxxl: 350 }}
        mx={{ xs: 'auto', md: 'unset' }}
        ml={{ md: align === 'right' ? 'auto' : 'unset' }}
        mr={{ md: align === 'left' ? 'auto' : 'unset' }}
      >
        {benefit.title}
      </Typography>
      <WysiwygStyledTypography
        text={benefit.body || ''}
        maxWidth={{ sm: 386, xxxl: 400 }}
        mx={{ xs: 'auto', md: 'unset' }}
        ml={{ md: align === 'right' ? 'auto' : 'unset' }}
        mr={{ md: align === 'left' ? 'auto' : 'unset' }}
      />
    </AnimationZoomIn>
  );
}

interface Props {
  productImage?: ImageModelWithoutNode;
  benefits: ListItemModel[];
  onHeight?: (v: number) => void;
  showProduct?: boolean;
  color?: CSSProperties['color'];
}

export default function BenefitsSection(props: Props) {
  const theme = useTheme();

  const {
    onHeight,
    showProduct = false,
    benefits,
    productImage,
    color = theme.palette.common.skyBlue,
  } = props;
  const [benefitOne, benefitTwo, benefitThree, benefitFour] = benefits;

  const { md } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));

  const productImageSpring = useSpring({
    scale: showProduct && productImage ? 1 : 0,
  });

  const { ref: containerRef } = useResizeObserverCallback({ onHeight });

  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <ContentContainer
      py={SECTIONAL_GAP}
      ref={containerRef}
      textAlign={{ xs: 'center', md: 'left' }}
    >
      <Stack
        ref={sectionRef}
        direction={{ xs: 'column', md: 'row' }}
        rowGap={3.75}
        justifyContent="center"
      >
        {showProduct && productImage && !isTablet && (
          <ABox
            component="div"
            width={226}
            height={308}
            mx="auto"
            position="relative"
          >
            <AnimatedImage
              src={productImage?.sourceUrl}
              alt={productImage?.altText}
              sizes="60vw"
              objectFit="contain"
            />
          </ABox>
        )}

        <Box
          component="div"
          maxWidth={{ xs: '100%', md: '32.5%', lg: '25%' }}
          textAlign={{ xs: 'center', md: 'right' }}
        >
          <Box component="div" position="relative">
            <BenefitItem
              benefit={benefitOne}
              inView={sectionInView}
              delay={200}
              align="right"
              imageSize={{ xs: '14.4vw', md: '4.65vw' }}
            >
              {isTablet && (
                <Box
                  component="div"
                  position="absolute"
                  bottom="-100px"
                  right="-38px"
                  color={color}
                  sx={{ opacity: 0.4 }}
                >
                  <BenefitArrow1 width="112px" height="75px" />
                </Box>
              )}
            </BenefitItem>
          </Box>

          <Box
            component="div"
            mt={{ xs: 3.75, md: '27vh' }}
            position="relative"
          >
            <BenefitItem
              benefit={benefitTwo}
              inView={sectionInView}
              delay={400}
              align="right"
              imageSize={{ xs: '14.13vw', md: '4.75vw' }}
            >
              {isTablet && (
                <Box
                  component="div"
                  position="absolute"
                  bottom={{ lg: 20 }}
                  right={-158}
                  color={color}
                  sx={{ opacity: 0.4 }}
                >
                  <BenefitArrow2 width={138} height={29} />
                </Box>
              )}
            </BenefitItem>
          </Box>
        </Box>
        <Box
          component="div"
          width={{ md: '70vh', lg: '55vh', xl: '65vh' }}
          position="relative"
          mx={4}
        >
          <ABox
            component="div"
            width="90%"
            height="90%"
            mx="auto"
            position="relative"
            style={productImageSpring}
          >
            <AnimatedImage
              src={productImage?.sourceUrl}
              alt={productImage?.altText}
              sizes={`(max-width: ${md}px) 50vw, 35vw`}
              objectFit="contain"
            />
          </ABox>
        </Box>
        <Box component="div" maxWidth={{ xs: '100%', md: '32.5%', lg: '25%' }}>
          <Box
            component="div"
            mt={{ xs: 0, md: 0, lg: -5 }}
            position="relative"
          >
            <BenefitItem
              benefit={benefitThree}
              inView={sectionInView}
              delay={300}
              align="left"
              imageSize={{ xs: '14.13vw', md: '5.76vw' }}
            >
              {isTablet && (
                <Box
                  component="div"
                  position="absolute"
                  top="-15%"
                  left="-40%"
                  color={color}
                  sx={{ opacity: 0.4 }}
                >
                  <BenefitArrow3 width="131px" height="65px" />
                </Box>
              )}
            </BenefitItem>
          </Box>

          <Box
            component="div"
            mt={{ xs: 3.75, md: '27vh' }}
            position="relative"
          >
            <BenefitItem
              benefit={benefitFour}
              inView={sectionInView}
              delay={500}
              align="left"
              imageSize={{ xs: '12.53vw', md: '4.93vw' }}
            >
              {isTablet && (
                <Box
                  component="div"
                  position="absolute"
                  top="-40%"
                  left="-10%"
                  color={color}
                  sx={{ opacity: 0.4 }}
                >
                  <BenefitArrow4 width="87px" height="105px" />
                </Box>
              )}
            </BenefitItem>
          </Box>
        </Box>
      </Stack>
    </ContentContainer>
  );
}
