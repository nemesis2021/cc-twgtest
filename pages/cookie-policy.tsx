import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { Box, Typography, useTheme } from '@mui/material';
import type { HeadModel } from '../utils/models/rankmath/HeadModel';
import type { CookiePolicyPageModel } from '../utils/models/pages/CookiePolicyPageModel';
import getHead from '../utils/queries/rankmath/getHead';
import getCookiePolicyPage from '../utils/queries/pages/getCookiePolicyPage';
import ContentContainer from '../components/ContentContainer';
import {
  NAV_HEIGHT_MD,
  NAV_HEIGHT_XS,
  SECTIONAL_GAP,
} from '../utils/styleGlobals';
import { REVALIDATE_PAGES } from '../utils/globals';
import { COOKIE_POLICY_PAGE } from '../utils/routes';
import AnimatedBackgroundWrapper from '../components/AnimatedBackgroundWrapper';

const MetaData = dynamic(() => import('../components/MetaData'));
const BreadCrumbs = dynamic(() => import('../components/Breadcrumbs'));
const TitleBodyContent = dynamic(
  () => import('../components/TitleBodyContent'),
);

interface Props {
  head: HeadModel;
  page: CookiePolicyPageModel;
}

export default function CookiePolicy(props: Props) {
  const { head, page } = props;
  const { heading, contents } = page.cookiePolicyPage;

  const theme = useTheme();
  const { primaryGreen, white } = theme.palette.common;

  return (
    <>
      <MetaData head={head} />
      <AnimatedBackgroundWrapper color={white} immediate>
        <ContentContainer mb={SECTIONAL_GAP}>
          <BreadCrumbs
            pt={{ xs: NAV_HEIGHT_XS, md: NAV_HEIGHT_MD }}
            pb={3.75}
            displayHome
            currentPageTitle={heading}
          />
          <Box component="div" maxWidth={{ md: '100%', xl: '70%' }} mx="auto">
            <Typography
              color={primaryGreen}
              variant="h1"
              mb={{ xs: 2.5, md: 5 }}
            >
              {heading}
            </Typography>
            {contents && <TitleBodyContent data={contents} />}
          </Box>
        </ContentContainer>
      </AnimatedBackgroundWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const head = await getHead({ url: COOKIE_POLICY_PAGE });
  const page = await getCookiePolicyPage();

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
