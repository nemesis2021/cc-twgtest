import { getServerSideSitemapLegacy } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { BASE_URL } from '../utils/globals';
import { BLOG_HUB_PAGE } from '../utils/routes';
import getPathFromCmsUrl from '../utils/getPathFromCmsUrl';
import getBlogPostsUri from '../utils/queries/getBlogPostsUri';

export default function SitemapBlogPosts() {}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const newsUris = await getBlogPostsUri();
  const paths = newsUris.map(
    (v) => `${BLOG_HUB_PAGE}${getPathFromCmsUrl(v.uri)}`,
  );

  return getServerSideSitemapLegacy(
    ctx,
    paths.map((v) => ({
      loc: `${BASE_URL}${v}`,
    })),
  );
};
