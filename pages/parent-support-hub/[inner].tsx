import { GetStaticPaths, GetStaticProps } from 'next/types';
import dynamic from 'next/dynamic';
import { Typography, useTheme } from '@mui/material';
import { REVALIDATE_PAGES } from '../../utils/globals';
import getHead from '../../utils/queries/rankmath/getHead';
import getBlogPost, {
  BLOG_POST_PREFIX,
} from '../../utils/queries/customPostTypes/getBlogPost';
import type { HeadModel } from '../../utils/models/rankmath/HeadModel';
import type { BlogPostModel } from '../../utils/models/customPostTypes/BlogPostModel';
import BreadCrumbs from '../../components/Breadcrumbs';
import {
  CONTENT_GAP,
  MAX_WIDTH_SM,
  NAV_HEIGHT_MD,
  NAV_HEIGHT_XS,
  SECTIONAL_GAP,
} from '../../utils/styleGlobals';
import ContentContainer from '../../components/ContentContainer';
import AnimatedBackgroundWrapper from '../../components/AnimatedBackgroundWrapper';

const MetaData = dynamic(() => import('../../components/MetaData'));
const FlexibleBlocks = dynamic(
  () => import('../../components/FlexibleBlocks/FlexibleBlocks'),
);
const SocialShareSection = dynamic(
  () => import('../../components/Sections/SocialShareSection'),
);

const SEOSection = dynamic(
  () => import('../../components/Sections/SEOSection'),
);
const BlogPostsSection = dynamic(
  () => import('../../components/Sections/BlogPostsSection'),
);

interface Props {
  page: BlogPostModel;
  head: HeadModel;
}

function Blog(props: Props) {
  const { page, head } = props;
  const { blogPostType } = page;
  const { flexibleBlocks, seoSection, featuredBlogPostsSection } = blogPostType;

  const theme = useTheme();
  const { primaryGreen, white } = theme.palette.common;

  return (
    <>
      <MetaData head={head} />
      <AnimatedBackgroundWrapper color={white} immediate>
        <ContentContainer>
          <BreadCrumbs
            pt={{ xs: NAV_HEIGHT_XS + 0.5, md: NAV_HEIGHT_MD + 0.5 }}
            currentPageTitle={blogPostType.heading || page.title}
          />
        </ContentContainer>
        <ContentContainer maxWidth={MAX_WIDTH_SM} my={SECTIONAL_GAP}>
          <Typography variant="h1" color={primaryGreen} my={CONTENT_GAP}>
            {blogPostType.heading || page.title}
          </Typography>
          {flexibleBlocks.flexibleBlock &&
          flexibleBlocks.flexibleBlock.length > 0 ? (
            <FlexibleBlocks
              data={flexibleBlocks.flexibleBlock}
              flexibleBlockPrefix={BLOG_POST_PREFIX}
            />
          ) : (
            <Typography textAlign="center">Blog is empty.</Typography>
          )}
        </ContentContainer>
        <SocialShareSection />
        {featuredBlogPostsSection.blogPosts && (
          <BlogPostsSection data={featuredBlogPostsSection} />
        )}

        <SEOSection data={seoSection} />
      </AnimatedBackgroundWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = `${params?.inner}`;

  const head = await getHead({
    url: `${slug}`,
  });
  const page = await getBlogPost({
    id: slug,
  });

  const props: Props = { page, head };

  return {
    props,
    notFound: page === null,
    revalidate: REVALIDATE_PAGES,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
});

export default Blog;
