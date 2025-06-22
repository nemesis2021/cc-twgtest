import { alpha, Box, Typography, useTheme } from '@mui/material';
import { forwardRef, Ref } from 'react';
import { ProductModel } from '../../utils/models/woocommerce/ProductModel';
import { BORDER_RADIUS } from '../../utils/styleGlobals';
import WysiwygStyledTypography from '../WysiwygStyledTypography';
import Button from '../Buttons/Button';
import Accordion from '../Accordion';
import ProductInfo from '../Sections/ProductInfo';
import { LinkModel } from '../../utils/models/LinkModel';

interface Props {
  data: ProductModel;
  link?: LinkModel;
}

function ProductInforCard(props: Props, ref: Ref<HTMLDivElement>) {
  const { data, link } = props;

  const { productFields, description } = data;
  const { colors, colorTheme, productInfo, productDisplayName } = productFields;
  const { longName } = productDisplayName;

  const theme = useTheme();
  const { black, white, cementGrey } = theme.palette.common;

  return (
    <Box
      component="div"
      bgcolor={white}
      sx={{ boxShadow: `0px 4px 10px 0px ${alpha(black, 0.15)}` }}
      py={{ xs: 3.75, md: 6.25 }}
      px={{ xs: 2.5, md: 6.25 }}
      borderRadius={BORDER_RADIUS}
      borderBottom={`4px solid ${colors.primaryColor}`}
      ref={ref}
    >
      <Box component="div">
        <Typography variant="h2" color={colors.primaryColor} pb={3.75}>
          {longName}
        </Typography>
        <WysiwygStyledTypography
          text={description}
          typographyVariant="body2"
          mb={4.25}
          color={cementGrey}
        />
      </Box>

      {link && (
        <Button label={link.title} href={link.url} variant={colorTheme} />
      )}

      {productInfo && (
        <Accordion
          mt={5}
          customColor={colors.primaryColor}
          exclusiveExpand
          data={productInfo.map((item) => ({
            title: item.label,
            body: (
              <ProductInfo
                data={item}
                bgColor={colors.secondaryColor}
                colorTheme={colorTheme}
              />
            ),
          }))}
        />
      )}
    </Box>
  );
}

export default forwardRef<HTMLDivElement, Props>(ProductInforCard);
