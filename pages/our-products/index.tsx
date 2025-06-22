import dynamic from 'next/dynamic';
import { GetStaticProps } from 'next';
import { Box, useTheme } from '@mui/material';
import { REVALIDATE_PAGES } from '../../utils/globals';
import { OUR_PRODUCTS_PAGE } from '../../utils/routes';
import {
  NAV_HEIGHT_MD,
  NAV_HEIGHT_XS,
  SECTIONAL_GAP_XXXL,
} from '../../utils/styleGlobals';
import type { HeadModel } from '../../utils/models/rankmath/HeadModel';
import type { BlogPostsSectionModel } from '../../utils/models/customPostTypes/BlogPostModel';
import type { OurProductsPageModel } from '../../utils/models/pages/OurProductsPageModel';
import getHead from '../../utils/queries/rankmath/getHead';
import getBlogPostsSection from '../../utils/queries/globals/getBlogPostsSection';
import getOurProductsPage from '../../utils/queries/pages/getOurProductsPage';

import ContentContainer from '../../components/ContentContainer';
import AnimatedBackgroundWrapper from '../../components/AnimatedBackgroundWrapper';

const MetaData = dynamic(() => import('../../components/MetaData'));
const BreadCrumbs = dynamic(() => import('../../components/Breadcrumbs'));
const MainContentSection = dynamic(
  () => import('../../components/Sections/MainContentSection'),
);
const AnchorGroup = dynamic(
  () => import('../../components/Sections/OurProducts/AnchorGroup'),
);
const OurProductsSection = dynamic(
  () => import('../../components/Sections/OurProducts/OurProductsSection'),
);
const BlogPostsSection = dynamic(
  () => import('../../components/Sections/BlogPostsSection'),
);

interface Props {
  head: HeadModel;
  page: OurProductsPageModel;
  blogPostSection: BlogPostsSectionModel;
}

export default function OurProducts(props: Props) {
  const { head, page, blogPostSection } = props;
  const { mainContentSection, productsSection } = page.ourProductsPage;

  const theme = useTheme();
  const { primaryGreen, white } = theme.palette.common;

  return (
    <>
      <MetaData head={head} />
      <AnimatedBackgroundWrapper
        color={white}
        immediate
        threshold={0.1}
        rootMargin="-50% 0px 0px 0px"
      >
        <ContentContainer>
          <BreadCrumbs
            pt={{ xs: NAV_HEIGHT_XS, md: NAV_HEIGHT_MD }}
            displayHome
          />
        </ContentContainer>

        <MainContentSection
          headingVariant="h1"
          data={mainContentSection}
          headingColor={primaryGreen}
          my={0}
          mt={8}
        >
          <AnchorGroup data={productsSection.products.nodes} />
        </MainContentSection>
      </AnimatedBackgroundWrapper>

      <OurProductsSection data={productsSection} />

      <AnimatedBackgroundWrapper color={white}>
        <Box component="div" mt={{ xs: undefined, md: -SECTIONAL_GAP_XXXL }}>
          <BlogPostsSection data={blogPostSection} />
        </Box>
      </AnimatedBackgroundWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const head = await getHead({ url: OUR_PRODUCTS_PAGE });
  const page = await getOurProductsPage();
  const blogPostSection = await getBlogPostsSection();

  const props = {
    head,
    page,
    blogPostSection,
  };

  return {
    props,
    notFound: page === null,
    revalidate: REVALIDATE_PAGES,
  };
};
