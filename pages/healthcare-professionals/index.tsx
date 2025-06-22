import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material';
import { REVALIDATE_PAGES } from '../../utils/globals';
import { SECTIONAL_GAP } from '../../utils/styleGlobals';
import { MEDICAL_RESOURCE_HUB_PAGE } from '../../utils/routes';
import type { HeadModel } from '../../utils/models/rankmath/HeadModel';
import type { MedicalResourceHubPageModel } from '../../utils/models/pages/MedicalResourceHubPageModel';
import type { MedicalHubPageConsentModel } from '../../utils/models/MedicalHubPageConsentModel';
import getHead from '../../utils/queries/rankmath/getHead';
import getMedicalResourceHubPage from '../../utils/queries/pages/getMedicalResourceHubPage';
import getMedicalHubConsent from '../../utils/queries/globals/getMedicalHubConsent';
import AnimatedBackgroundWrapper from '../../components/AnimatedBackgroundWrapper';
import HeadingAndBodyContentSection from '../../components/Sections/HeadingAndBodyContentSection';

const MetaData = dynamic(() => import('../../components/MetaData'));
const GeneralHeaderSection = dynamic(
  () => import('../../components/Sections/GeneralHeaderSection'),
);
const IconListSection = dynamic(
  () => import('../../components/Sections/MedicalHubPage/IconListSection'),
);
const MedicalHubPageContentSection2 = dynamic(
  () => import('../../components/Sections/MedicalHubPage/ContentSection2'),
);
const TabContentSection = dynamic(
  () => import('../../components/Sections/TabContentSection'),
);
const MainContentSection = dynamic(
  () => import('../../components/Sections/MainContentSection'),
);
const MediaContentSection = dynamic(
  () => import('../../components/Sections/MediaContentSection'),
);
const FaqWithSearchSection = dynamic(
  () => import('../../components/Sections/FaqWithSearchSection'),
);
const ConsentModal = dynamic(
  () => import('../../components/Sections/MedicalHubPage/ConsentModal'),
);

interface Props {
  head: HeadModel;
  page: MedicalResourceHubPageModel;
  medicalHubPageConsent: MedicalHubPageConsentModel;
}

export default function MedicalResourceHub(props: Props) {
  const { head, page, medicalHubPageConsent } = props;
  const {
    headerSection,
    tabContentSection,
    mainContentSection,
    headingAndBodyContent,
    contentSection1,
    contentSection2,
    mediaContentSection1,
    mediaContentSection2,
    mediaContentSection3,
    faqSection,
  } = page.medicalResourceHubPage;

  const theme = useTheme();
  const { bgGreen, white } = theme.palette.common;

  return (
    <>
      <MetaData head={head} />
      <ConsentModal data={medicalHubPageConsent} />
      <AnimatedBackgroundWrapper color={bgGreen} immediate>
        <GeneralHeaderSection data={headerSection} />
      </AnimatedBackgroundWrapper>
      <AnimatedBackgroundWrapper color={white}>
        <IconListSection data={contentSection1} />
        <HeadingAndBodyContentSection data={headingAndBodyContent} />
      </AnimatedBackgroundWrapper>
      <AnimatedBackgroundWrapper color={bgGreen}>
        <TabContentSection data={tabContentSection} />
      </AnimatedBackgroundWrapper>
      <AnimatedBackgroundWrapper color={white}>
        <MainContentSection
          data={mainContentSection}
          my={0}
          mt={SECTIONAL_GAP}
        />
      </AnimatedBackgroundWrapper>
      <AnimatedBackgroundWrapper color={white}>
        <MedicalHubPageContentSection2 data={contentSection2} />
      </AnimatedBackgroundWrapper>
      <AnimatedBackgroundWrapper color={white}>
        <MediaContentSection data={mediaContentSection1} />
        <MediaContentSection data={mediaContentSection2} />
        <MediaContentSection data={mediaContentSection3} />
        <FaqWithSearchSection data={faqSection} search={false} />
      </AnimatedBackgroundWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const head = await getHead({ url: MEDICAL_RESOURCE_HUB_PAGE });
  const page = await getMedicalResourceHubPage();
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
