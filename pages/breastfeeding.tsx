import dynamic from 'next/dynamic';
import { GetStaticProps } from 'next/types';
import { useTheme } from '@mui/material';
import { REVALIDATE_PAGES } from '../utils/globals';
import { BREASTFEEDING_PAGE } from '../utils/routes';
import getBreastfeedingPage from '../utils/queries/pages/getBreastfeedingPage';
import getHead from '../utils/queries/rankmath/getHead';
import getBlogPostsSection from '../utils/queries/globals/getBlogPostsSection';
import type { HeadModel } from '../utils/models/rankmath/HeadModel';
import type { BreastfeedingPageModel } from '../utils/models/pages/BreastfeedingPageModel';
import type { BlogPostsSectionModel } from '../utils/models/customPostTypes/BlogPostModel';
import GeneralHeaderSection from '../components/Sections/GeneralHeaderSection';
import AnimatedBackgroundWrapper from '../components/AnimatedBackgroundWrapper';

const MetaData = dynamic(() => import('../components/MetaData'));
const MediaContentSection = dynamic(
  () => import('../components/Sections/MediaContentSection'),
);
const BlogPostsSection = dynamic(
  () => import('../components/Sections/BlogPostsSection'),
);
const SEOSection = dynamic(() => import('../components/Sections/SEOSection'));

interface Props {
  head: HeadModel;
  page: BreastfeedingPageModel;
  blogPostSection: BlogPostsSectionModel;
}

function Breastfeeding(props: Props) {
  const { head, page, blogPostSection } = props;
  const { generalHeaderSection, breastfeedingContentSection, seoSection } =
    page.breastfeedingPage;

  const theme = useTheme();
  const { bgBlue, white } = theme.palette.common;

  return (
    <>
      <MetaData head={head} />
      <AnimatedBackgroundWrapper color={white} immediate>
        <GeneralHeaderSection data={generalHeaderSection} />
      </AnimatedBackgroundWrapper>
      <AnimatedBackgroundWrapper color={bgBlue}>
        {breastfeedingContentSection.mediaContentSections.map((section) => (
          <MediaContentSection data={section} variant={2} />
        ))}
      </AnimatedBackgroundWrapper>
      <AnimatedBackgroundWrapper color={white}>
        <BlogPostsSection data={blogPostSection} />
        <SEOSection data={seoSection} />
      </AnimatedBackgroundWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const page = await getBreastfeedingPage();
  const head = await getHead({
    url: BREASTFEEDING_PAGE,
  });
  const blogPostSection = await getBlogPostsSection();

  const props: Props = {
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

export default Breastfeeding;
