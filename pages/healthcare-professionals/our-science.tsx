import { useTheme } from '@mui/material';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import type { HeadModel } from '../../utils/models/rankmath/HeadModel';
import type { OurSciencePageModel } from '../../utils/models/pages/OurSciencePageModel';
import type { MedicalHubPageConsentModel } from '../../utils/models/MedicalHubPageConsentModel';
import getHead from '../../utils/queries/rankmath/getHead';
import getOurSciencePage from '../../utils/queries/pages/getOurSciencePage';
import getMedicalHubConsent from '../../utils/queries/globals/getMedicalHubConsent';
import AnimatedBackgroundWrapper from '../../components/AnimatedBackgroundWrapper';
import { OUR_SCIENCE_PAGE } from '../../utils/routes';
import { REVALIDATE_PAGES } from '../../utils/globals';

const MetaData = dynamic(() => import('../../components/MetaData'));
const ConsentModal = dynamic(
  () => import('../../components/Sections/MedicalHubPage/ConsentModal'),
);
const GeneralHeaderSection = dynamic(
  () => import('../../components/Sections/GeneralHeaderSection'),
);
const TabContentSection = dynamic(
  () => import('../../components/Sections/TabContentSection'),
);

interface Props {
  head: HeadModel;
  page: OurSciencePageModel;
  medicalHubPageConsent: MedicalHubPageConsentModel;
}

export default function OurScience(props: Props) {
  const { head, page, medicalHubPageConsent } = props;
  const { headerSection, tabContentSection } = page.ourSciencePage;

  const theme = useTheme();
  const { bgGreen, white } = theme.palette.common;

  return (
    <>
      <MetaData head={head} />
      <ConsentModal data={medicalHubPageConsent} />

      <AnimatedBackgroundWrapper color={white} immediate>
        <GeneralHeaderSection data={headerSection} />
      </AnimatedBackgroundWrapper>

      <AnimatedBackgroundWrapper color={bgGreen} threshold={0.1}>
        <TabContentSection data={tabContentSection} />
      </AnimatedBackgroundWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const head = await getHead({ url: OUR_SCIENCE_PAGE });
  const page = await getOurSciencePage();
  const medicalHubPageConsent = await getMedicalHubConsent();

  const props = {
    head,
    page,
    medicalHubPageConsent,
  };

  return {
    props,
    notFound: page === null,
    revalidate: REVALIDATE_PAGES,
  };
};
