import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { Box, useTheme } from '@mui/material';
import { HeadModel } from '../utils/models/rankmath/HeadModel';
import { REVALIDATE_PAGES } from '../utils/globals';
import getHead from '../utils/queries/rankmath/getHead';
import getStagesPage from '../utils/queries/pages/getStagesPage';
import getPublicationSection from '../utils/queries/globals/getPublicationSection';
import type { StagesPageModel } from '../utils/models/pages/StagesPageModel';
import type { PublicationSectionModel } from '../utils/models/sections/PublicationsSectionModel';
import AnimatedBackgroundWrapper from '../components/AnimatedBackgroundWrapper';
import MainContentSection from '../components/Sections/MainContentSection';
import { NAV_HEIGHT_MD, NAV_HEIGHT_XS } from '../utils/styleGlobals';
import { STAGES_PAGE } from '../utils/routes';

const MetaData = dynamic(() => import('../components/MetaData'));
const PublicationSection = dynamic(
  () => import('../components/Sections/PublicationSliderSection'),
);
const OurProductsSection = dynamic(
  () => import('../components/Sections/StagesPage/ProductsSection'),
);

interface Props {
  head: HeadModel;
  page: StagesPageModel;
  publicationSection: PublicationSectionModel;
}

export default function StagesPage(props: Props) {
  const { head, page, publicationSection } = props;
  const { mainContentSection, productsSection } = page.stagesPage;

  const theme = useTheme();
  const { white } = theme.palette.common;

  return (
    <>
      <MetaData head={head} />

      <AnimatedBackgroundWrapper immediate color={white}>
        <Box component="div" pt={{ xs: NAV_HEIGHT_XS, md: NAV_HEIGHT_MD }}>
          <MainContentSection data={mainContentSection} />
        </Box>
      </AnimatedBackgroundWrapper>

      <OurProductsSection data={productsSection} />

      <AnimatedBackgroundWrapper color={white}>
        <PublicationSection data={publicationSection} />
      </AnimatedBackgroundWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const head = await getHead({ url: STAGES_PAGE });
  const page = await getStagesPage();
  const publicationSection = await getPublicationSection();

  const props = {
    head,
    page,
    publicationSection,
  };

  return {
    props,
    notFound: page === null,
    revalidate: REVALIDATE_PAGES,
  };
};
