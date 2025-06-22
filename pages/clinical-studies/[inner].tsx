import { GetStaticPaths, GetStaticProps } from 'next/types';
import dynamic from 'next/dynamic';
import { Typography, useTheme } from '@mui/material';
import { BASE_URL, CMS_URL, REVALIDATE_PAGES } from '../../utils/globals';
import getHead from '../../utils/queries/rankmath/getHead';
import getClinicalStudy, {
  CLINICAL_STUDY_POST_PREFIX,
} from '../../utils/queries/customPostTypes/getClinicalStudy';
import { CLINICAL_STUDIES_PAGE, CLINICAL_STUDY_PATH } from '../../utils/routes';
import type { HeadModel } from '../../utils/models/rankmath/HeadModel';
import type { ClinicalStudyModel } from '../../utils/models/customPostTypes/ClinicalStudyModel';
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

interface Props {
  page: ClinicalStudyModel;
  head: HeadModel;
}

function ClinicalStudy(props: Props) {
  const { page, head } = props;
  const { clinicalStudyPostType, title } = page;
  const { flexibleBlocks } = clinicalStudyPostType;

  const theme = useTheme();
  const { primaryGreen, cementGrey, white } = theme.palette.common;

  return (
    <>
      <MetaData head={head} />
      <AnimatedBackgroundWrapper color={white} immediate>
        <ContentContainer>
          <BreadCrumbs
            pt={{ xs: NAV_HEIGHT_XS + 0.5, md: NAV_HEIGHT_MD + 0.5 }}
            currentPageTitle={title}
          />
        </ContentContainer>
        <ContentContainer maxWidth={MAX_WIDTH_SM} mb={SECTIONAL_GAP}>
          <Typography
            variant="h2"
            component="h1"
            color={primaryGreen}
            my={CONTENT_GAP}
          >
            {clinicalStudyPostType.heading || title}
          </Typography>
          {clinicalStudyPostType.source && (
            <Typography variant="body3" mb={4} color={cementGrey}>
              {clinicalStudyPostType.source}
            </Typography>
          )}
          {flexibleBlocks.flexibleBlock &&
          flexibleBlocks.flexibleBlock.length > 0 ? (
            <FlexibleBlocks
              data={flexibleBlocks.flexibleBlock}
              flexibleBlockPrefix={CLINICAL_STUDY_POST_PREFIX}
            />
          ) : (
            <Typography textAlign="center">Post is empty.</Typography>
          )}
        </ContentContainer>
        <SocialShareSection />
      </AnimatedBackgroundWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = `${params?.inner}`;

  const head = await getHead(
    {
      url: `${CLINICAL_STUDY_PATH}/${slug}`,
    },
    {
      searchValue: `${CMS_URL}${CLINICAL_STUDY_PATH}`,
      replaceValue: `${BASE_URL}${CLINICAL_STUDIES_PAGE}`,
    },
  );

  const page = await getClinicalStudy({
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

export default ClinicalStudy;
