import dynamic from 'next/dynamic';
import { GetStaticProps } from 'next';
import { useTheme } from '@mui/material';
import { REVALIDATE_PAGES } from '../../utils/globals';
import { BLOG_HUB_PAGE } from '../../utils/routes';
import type { HeadModel } from '../../utils/models/rankmath/HeadModel';
import type { CategoriesModel } from '../../utils/models/CategoryModel';
import type { KnowledgeHubPageModel } from '../../utils/models/pages/KnowledgeHubPage';
import getHead from '../../utils/queries/rankmath/getHead';
import getBlogHubPage from '../../utils/queries/pages/getBlogHubPage';
import getCategories from '../../utils/queries/getCategories';
import GeneralHeaderSection from '../../components/Sections/GeneralHeaderSection';
import AnimatedBackgroundWrapper from '../../components/AnimatedBackgroundWrapper';

const MetaData = dynamic(() => import('../../components/MetaData'));
const BlogsWithFilterSection = dynamic(
  () => import('../../components/Sections/BlogsWithFilterSection'),
);
const ProductsSection = dynamic(
  () => import('../../components/Sections/ProductsSection'),
);
const SEOSection = dynamic(
  () => import('../../components/Sections/SEOSection'),
);

interface Props {
  head: HeadModel;
  page: KnowledgeHubPageModel;
  categories: CategoriesModel[];
}

export default function BlogHub(props: Props) {
  const { head, page, categories } = props;
  const { generalHeaderSection, productsSection, seoSection } =
    page.knowledgeHubPage;

  const theme = useTheme();
  const { dirtyWhite, bgGreen } = theme.palette.common;

  return (
    <>
      <MetaData head={head} />
      <AnimatedBackgroundWrapper
        color={bgGreen}
        immediate
        threshold={[0.1, 0.13]}
        rootMargin="-50% 0px 0px 0px"
      >
        <GeneralHeaderSection data={generalHeaderSection} />
      </AnimatedBackgroundWrapper>
      <AnimatedBackgroundWrapper color={dirtyWhite} threshold={[0.1, 0.13]}>
        <BlogsWithFilterSection categories={categories} />
        <ProductsSection data={productsSection} />
        <SEOSection data={seoSection} />
      </AnimatedBackgroundWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const head = await getHead({ url: BLOG_HUB_PAGE });
  const page = await getBlogHubPage();
  const categories = await getCategories();
  const props = {
    head,
    page,
    categories,
  };

  return {
    props,
    notFound: page === null,
    revalidate: REVALIDATE_PAGES,
  };
};
