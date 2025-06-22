import dynamic from 'next/dynamic';
import { GetStaticProps } from 'next/types';
import { useTheme } from '@mui/material';
import { REVALIDATE_PAGES } from '../utils/globals';
import { ABOUT_US_PAGE } from '../utils/routes';
import getAboutUsPage from '../utils/queries/pages/getAboutUsPage';
import getHead from '../utils/queries/rankmath/getHead';
import getTeamMembers from '../utils/queries/customPostTypes/getTeamMembers';
import getBlogPostsSection from '../utils/queries/globals/getBlogPostsSection';
import type { HeadModel } from '../utils/models/rankmath/HeadModel';
import type { AboutUsPageModel } from '../utils/models/pages/AboutUsPageModel';
import type { TeamMemberModel } from '../utils/models/customPostTypes/TeamMemberModel';
import type { BlogPostsSectionModel } from '../utils/models/customPostTypes/BlogPostModel';
import GeneralHeaderSection from '../components/Sections/GeneralHeaderSection';
import AnimatedDivider from '../components/AnimatedDivider';
import ContentContainer from '../components/ContentContainer';
import AnimatedBackgroundWrapper from '../components/AnimatedBackgroundWrapper';
import Accordion from '../components/Accordion';
import { MAX_WIDTH_SM, SECTIONAL_GAP } from '../utils/styleGlobals';

const MetaData = dynamic(() => import('../components/MetaData'));
const MediaContentSection = dynamic(
  () => import('../components/Sections/MediaContentSection'),
);
const BlogPostsSection = dynamic(
  () => import('../components/Sections/BlogPostsSection'),
);
const TeamMembersSection = dynamic(
  () => import('../components/Sections/TeamSection'),
);
const SlideSection = dynamic(
  () => import('../components/Sections/SlideSection'),
);
const SEOSection = dynamic(() => import('../components/Sections/SEOSection'));

interface Props {
  head: HeadModel;
  page: AboutUsPageModel;
  teamMembers: TeamMemberModel[];

  blogPostSection: BlogPostsSectionModel;
}

function AboutUs(props: Props) {
  const { head, page, teamMembers, blogPostSection } = props;
  const {
    generalHeaderSection,
    slideSection,
    teamSection,
    mediaContentSection1,
    mediaContentSection2,
    seoSection,
    accordionSection,
  } = page.aboutUsPage;

  const theme = useTheme();
  const { bgGreen, white } = theme.palette.common;

  const accordionData = accordionSection.accordion.map((item) => ({
    title: item.title,
    body: item.body,
  }));
  return (
    <>
      <MetaData head={head} />
      <AnimatedBackgroundWrapper color={bgGreen} immediate>
        <GeneralHeaderSection
          data={generalHeaderSection}
          currentPageTitle="About Us"
        />
      </AnimatedBackgroundWrapper>
      <AnimatedBackgroundWrapper color={white}>
        <ContentContainer mt={3.75} my={SECTIONAL_GAP} maxWidth={MAX_WIDTH_SM}>
          <Accordion data={accordionData} />
        </ContentContainer>
      </AnimatedBackgroundWrapper>
      <AnimatedBackgroundWrapper color={white}>
        <SlideSection data={slideSection} />
      </AnimatedBackgroundWrapper>
      <AnimatedBackgroundWrapper color={white}>
        <MediaContentSection data={mediaContentSection1} />
      </AnimatedBackgroundWrapper>
      <AnimatedBackgroundWrapper color={white}>
        <MediaContentSection data={mediaContentSection2} />
      </AnimatedBackgroundWrapper>
      <AnimatedBackgroundWrapper color={white}>
        <TeamMembersSection data={teamSection} teamMembers={teamMembers} />
      </AnimatedBackgroundWrapper>
      <ContentContainer>
        <AnimatedDivider />
      </ContentContainer>
      <AnimatedBackgroundWrapper color={white}>
        <BlogPostsSection data={blogPostSection} />
        <SEOSection data={seoSection} />
      </AnimatedBackgroundWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const page = await getAboutUsPage();
  const head = await getHead({
    url: ABOUT_US_PAGE,
  });
  const teamMembers = await getTeamMembers({
    first: 24,
  });
  const blogPostSection = await getBlogPostsSection();

  const props: Props = {
    head,
    page,
    teamMembers,
    blogPostSection,
  };

  return {
    props,
    notFound: page === null,
    revalidate: REVALIDATE_PAGES,
  };
};

export default AboutUs;
