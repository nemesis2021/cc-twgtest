import { GetStaticProps } from 'next';
import { useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { REVALIDATE_PAGES } from '../../utils/globals';
import { CLINICAL_STUDIES_PAGE } from '../../utils/routes';
import getClinicalStudiesPage from '../../utils/queries/pages/getClinicalStudiesPage';
import getHead from '../../utils/queries/rankmath/getHead';
import type { ClinicalStudiesPageModel } from '../../utils/models/pages/ClinicalStudiesPageModel';
import type { HeadModel } from '../../utils/models/rankmath/HeadModel';
import HeaderSectionCentered from '../../components/Sections/HeaderSectionCentered';
import AnimatedBackgroundWrapper from '../../components/AnimatedBackgroundWrapper';

const MetaData = dynamic(() => import('../../components/MetaData'));
const ClinicalStudiesWithSortSection = dynamic(
  () => import('../../components/Sections/ClinicalStudiesWithSortSection'),
);

interface Props {
  head: HeadModel;
  page: ClinicalStudiesPageModel;
}

export default function ClinicalStudies(props: Props) {
  const { head, page } = props;
  const { headerSection } = page.clinicalStudiesPage;

  const theme = useTheme();
  const { white } = theme.palette.common;

  return (
    <>
      <MetaData head={head} />
      <AnimatedBackgroundWrapper color={white} immediate>
        <HeaderSectionCentered
          data={headerSection}
          showImages
          currentPageTitle="Clinical Studies"
        />
        <ClinicalStudiesWithSortSection />
      </AnimatedBackgroundWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const head = await getHead({ url: CLINICAL_STUDIES_PAGE });
  const page = await getClinicalStudiesPage();

  const props = {
    head,
    page,
  };

  return {
    props,
    notFound: page === null,
    revalidate: REVALIDATE_PAGES,
  };
};
