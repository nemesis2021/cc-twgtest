import { getServerSideSitemapLegacy } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { BASE_URL } from '../utils/globals';
import getPathFromCmsUrl from '../utils/getPathFromCmsUrl';
import getClinicalstudiesUri from '../utils/queries/getClinicalstudiesUri';
import { CLINICAL_STUDIES_PAGE, CLINICAL_STUDY_PATH } from '../utils/routes';

export default function SitemapClinicalStudies() {}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const newsUris = await getClinicalstudiesUri();
  const paths = newsUris.map(
    (v) => `${CLINICAL_STUDIES_PAGE}${getPathFromCmsUrl(v.uri)}`,
  );

  return getServerSideSitemapLegacy(
    ctx,
    paths.map((v) => ({
      loc: `${BASE_URL}${v.replace(CLINICAL_STUDY_PATH, '')}`,
    })),
  );
};
