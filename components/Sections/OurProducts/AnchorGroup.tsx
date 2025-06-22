import { Stack, useMediaQuery, useTheme } from '@mui/material';
import { ProductPartialModel } from '../../../utils/models/woocommerce/ProductModel';
import Button from '../../Buttons/Button';
import RoundSelect from '../../Inputs/RoundSelect';
import { ChoiceModel } from '../../../utils/models/gravityForms/FormFieldModel';
import { NAV_HEIGHT_XS } from '../../../utils/styleGlobals';
import AnimationZoomIn from '../../Animation/AnimationZoomIn';

interface Props {
  data: ProductPartialModel[];
}

export default function AnchorGroup(props: Props) {
  const { data } = props;

  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));

  const getSlugFromName = (filterButtonLabel: string) => {
    const selectedProductIndex = data.findIndex(
      (product) =>
        product.productFields.filterButtonLabel === filterButtonLabel,
    );

    if (selectedProductIndex !== -1) {
      return data[selectedProductIndex].slug;
    }

    return '';
  };

  const handleAnchor = (id: string) => {
    if (typeof window !== 'undefined') {
      const targetEl = document.getElementById(id);
      const rect = targetEl?.getBoundingClientRect();
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      const offset = isTablet ? 0 : NAV_HEIGHT_XS + 100;

      if (rect) {
        window.scrollTo({
          top: rect.top + currentScrollPosition - offset,
          behavior: 'smooth',
        });
      }
    }
  };

  if (!isTablet) {
    const optionData: ChoiceModel[] = data.map((product) => ({
      text: product.productFields.filterButtonLabel,
      value: product.productFields.filterButtonLabel,
    }));

    return (
      <AnimationZoomIn delay={0.1}>
        <RoundSelect
          data={optionData}
          fullWidth
          placeholder="All Products"
          onChange={(selected) => {
            handleAnchor(getSlugFromName(selected.target.value as string));
          }}
        />
      </AnimationZoomIn>
    );
  }

  return (
    <Stack direction="row" justifyContent="center" gap={2} flexWrap="wrap">
      {data.map((product, index) => (
        <AnimationZoomIn delay={index * 100}>
          <Button
            key={product.databaseId}
            label={product.productFields.filterButtonLabel}
            variant="primaryGreenBorder"
            onClick={() => handleAnchor(product.slug)}
          />
        </AnimationZoomIn>
      ))}
    </Stack>
  );
}
