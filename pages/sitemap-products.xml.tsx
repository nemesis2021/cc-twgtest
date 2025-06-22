import { getServerSideSitemapLegacy } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { BASE_URL } from '../utils/globals';
import getPathFromCmsUrl from '../utils/getPathFromCmsUrl';
import getProductsUri from '../utils/queries/getProductsUri';
import { OUR_PRODUCTS_PAGE, PRODUCT_PATH } from '../utils/routes';

export default function SitemapProducts() {}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const newsUris = await getProductsUri();
  const paths = newsUris.map(
    (v) => `${OUR_PRODUCTS_PAGE}${getPathFromCmsUrl(v.uri)}`,
  );

  return getServerSideSitemapLegacy(
    ctx,
    paths.map((v) => ({
      loc: `${BASE_URL}${v.replace(PRODUCT_PATH, '')}`,
    })),
  );
};
