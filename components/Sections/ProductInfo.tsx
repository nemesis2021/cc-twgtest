import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import {
  ProductContentBlockTypes,
  ProductInfoBlockTypeEnum,
} from '../../utils/models/woocommerce/ProductModel';
import WysiwygStyledTypography from '../WysiwygStyledTypography';
import { ColorTheme } from '../../utils/models/ColorTheme';
import getColorFromTheme from '../../utils/getColorFromTheme';
import AnimatedImage from '../AnimatedImage';
import ImagesModal from './OurProductsInner/ImagesModal';

interface Props {
  data: ProductContentBlockTypes;
  bgColor: string;
  colorTheme: ColorTheme;
}

export default function ProductInfo(props: Props) {
  const { data, bgColor, colorTheme } = props;

  const { fieldGroupName } = data;

  const theme = useTheme();
  const { cementGrey } = theme.palette.common;
  const color = getColorFromTheme(colorTheme);

  if (fieldGroupName === ProductInfoBlockTypeEnum.ListBlock) {
    const { list } = data;

    return (
      <Stack rowGap={2}>
        {list.map((listItem) => (
          <Box component="div" key={listItem.title}>
            <Typography fontWeight={700} mb={2} color={color}>
              {listItem.title}
            </Typography>
            <WysiwygStyledTypography text={listItem.body} color={cementGrey} />
          </Box>
        ))}
      </Stack>
    );
  }

  if (fieldGroupName === ProductInfoBlockTypeEnum.FreeTextBlock) {
    const { text } = data;

    return <WysiwygStyledTypography text={text} />;
  }

  if (fieldGroupName === ProductInfoBlockTypeEnum.EquationBlock) {
    const { text1, text2, text3 } = data;

    return (
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        gap={2.5}
        alignItems="center"
      >
        <Stack
          direction={{ xs: 'row', md: 'column' }}
          bgcolor={bgColor}
          borderRadius="10px"
          alignItems="center"
          columnGap={1.25}
          p={2.5}
        >
          <Typography color={color} variant="h5">
            {text1.text}
          </Typography>
          {text1.suffix && (
            <Typography fontWeight={700} fontSize={14}>
              {text1.suffix}
            </Typography>
          )}
        </Stack>

        <Typography variant="h4" component="span" color={color}>
          +
        </Typography>

        <Stack
          direction={{ xs: 'row', md: 'column' }}
          bgcolor={bgColor}
          borderRadius="10px"
          alignItems="center"
          columnGap={1.25}
          p={2.5}
        >
          <Typography color={color} variant="h5">
            {text2.text}
          </Typography>
          {text2.suffix && (
            <Typography fontWeight={700} fontSize={14}>
              {text2.suffix}
            </Typography>
          )}
        </Stack>

        <Typography variant="h4" component="span" color={color}>
          =
        </Typography>

        <Stack
          direction={{ xs: 'row', md: 'column' }}
          bgcolor={bgColor}
          borderRadius="10px"
          alignItems="center"
          columnGap={1.25}
          p={2.5}
        >
          <Typography color={color} variant="h5">
            {text3.text}
          </Typography>
          {text3.suffix && (
            <Typography fontWeight={700} fontSize={14}>
              {text3.suffix}
            </Typography>
          )}
        </Stack>
      </Stack>
    );
  }

  if (fieldGroupName === ProductInfoBlockTypeEnum.ImageTextBlock) {
    const { items, description } = data;

    return (
      <Stack rowGap={3.75} pt={2.75}>
        <WysiwygStyledTypography text={description} />
        {items.map((item) => (
          <Grid container alignItems="center" rowSpacing={2}>
            <Grid item xs={12} md={12} xl={3}>
              <Box
                component="div"
                position="relative"
                width="130px"
                height="100px"
                flexGrow={1}
              >
                <AnimatedImage
                  src={item.image.node.sourceUrl}
                  alt={item.image.node.altText}
                  sizes="20vw"
                  objectFit="contain"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12} xl={9}>
              <Box component="div">
                <Typography color={color} fontWeight={700} pb={2}>
                  {item.title}
                </Typography>

                <WysiwygStyledTypography text={item.body} />
              </Box>
            </Grid>
          </Grid>
        ))}
      </Stack>
    );
  }

  if (fieldGroupName === ProductInfoBlockTypeEnum.ImageWithLightBoxBlock) {
    const { partialImage, modalImages, label } = data;

    return (
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={partialImage.node.sourceUrl}
          alt={partialImage.node.altText}
          style={{ width: '100%' }}
        />
        {modalImages && modalImages.nodes.length > 0 && (
          <ImagesModal
            label="View Full Information"
            title={label}
            images={modalImages}
            colorTheme={colorTheme}
          />
        )}
      </div>
    );
  }

  throw new Error('Layout item not supported.');
}
