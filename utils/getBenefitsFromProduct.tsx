import {
  ListBlockModel,
  ProductInfoBlockTypeEnum,
  ProductModel,
  ProductPartialModel,
} from './models/woocommerce/ProductModel';

export default function getBenefitsFromProduct(
  product: ProductModel | ProductPartialModel,
) {
  if (
    !('productInfo' in product.productFields) ||
    !product.productFields.productInfo
  ) {
    return undefined;
  }

  const [benefits] = product.productFields.productInfo.filter(
    (item) =>
      item.label === 'Benefits' &&
      item.fieldGroupName === ProductInfoBlockTypeEnum.ListBlock,
  );

  return benefits as ListBlockModel;
}
