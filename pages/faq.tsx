import { GetStaticProps } from 'next';
import { useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import type { HeadModel } from '../utils/models/rankmath/HeadModel';
import type { FaqPageModel } from '../utils/models/pages/FaqPageModel';
import getHead from '../utils/queries/rankmath/getHead';
import getFaqPage from '../utils/queries/pages/getFaqPage';
import { REVALIDATE_PAGES } from '../utils/globals';

import AnimatedBackgroundWrapper from '../components/AnimatedBackgroundWrapper';

const MetaData = dynamic(() => import('../components/MetaData'));
const HeaderSectionCentered = dynamic(
  () => import('../components/Sections/HeaderSectionCentered'),
);
const FaqWithSearchSection = dynamic(
  () => import('../components/Sections/FaqWithSearchSection'),
);

interface Props {
  head: HeadModel;
  page: FaqPageModel;
}

export default function Faq(props: Props) {
  const { head, page } = props;
  const { headerSection, contentSection } = page.faqPage;

  const theme = useTheme();
  const { white } = theme.palette.common;

  return (
    <>
      <MetaData head={head} />
      <AnimatedBackgroundWrapper color={white} immediate>
        <HeaderSectionCentered data={headerSection} />
        <FaqWithSearchSection data={contentSection} />
      </AnimatedBackgroundWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const head = await getHead({ url: '' });
  const page = await getFaqPage();

  const props = {
    head,
    page,
  };

  return {
    props,
    notFound: page === null,
    
  };
};
