import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material';
import { GetStaticProps } from 'next';
import { REVALIDATE_PAGES } from '../../utils/globals';
import { PUBLICATIONS_PAGE } from '../../utils/routes';
import type { HeadModel } from '../../utils/models/rankmath/HeadModel';
// import type { CategoriesModel } from '../../utils/models/CategoryModel';
import type { OurPublicationsPageModel } from '../../utils/models/pages/OurPublicationsPageModel';
import type { MedicalHubPageConsentModel } from '../../utils/models/MedicalHubPageConsentModel';
import getHead from '../../utils/queries/rankmath/getHead';
import getPublicationsPage from '../../utils/queries/pages/getPublicationsPage';
// import getCategories from '../../utils/queries/getCategories';
import getMedicalHubConsent from '../../utils/queries/globals/getMedicalHubConsent';
import HeaderSectionCentered from '../../components/Sections/HeaderSectionCentered';
import AnimatedBackgroundWrapper from '../../components/AnimatedBackgroundWrapper';

const MetaData = dynamic(() => import('../../components/MetaData'));
const ConsentModal = dynamic(
  () => import('../../components/Sections/MedicalHubPage/ConsentModal'),
);

const PublicationsSection = dynamic(
  () => import('../../components/Sections/PublicationsSection'),
);

interface Props {
  head: HeadModel;
  page: OurPublicationsPageModel;
  // categories: CategoriesModel[];
  medicalHubPageConsent: MedicalHubPageConsentModel;
}

export default function PublicationsPage(props: Props) {
  const { head, page, medicalHubPageConsent } = props;
  const { headerSection } = page.ourPublicationsPage;

  const theme = useTheme();
  const { white } = theme.palette.common;

  return (
    <>
      <MetaData head={head} />
      <ConsentModal data={medicalHubPageConsent} />
      <AnimatedBackgroundWrapper color={white} immediate>
        <HeaderSectionCentered data={headerSection} showImages />
        <PublicationsSection />
        {/* <PublicationsWithFilterSection categories={categories} /> */}
      </AnimatedBackgroundWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const head = await getHead({ url: PUBLICATIONS_PAGE });
  const page = await getPublicationsPage();
  // const categories = await getCategories();
  const medicalHubPageConsent = await getMedicalHubConsent();
  const props = {
    head,
    page,
    // categories,
    medicalHubPageConsent,
  };

  return {
    props,
    notFound: page === null,
    revalidate: REVALIDATE_PAGES,
  };
};
