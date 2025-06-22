import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material';
import { HeadModel } from '../utils/models/rankmath/HeadModel';
import { STOCKISTS_PAGE } from '../utils/routes';
import type { StockistsPageModel } from '../utils/models/pages/StockistsPageModel';
import getHead from '../utils/queries/rankmath/getHead';
import getStockistsPage from '../utils/queries/pages/getStockistsPage';
import AnimatedBackgroundWrapper from '../components/AnimatedBackgroundWrapper';
import HeaderSectionCentered from '../components/Sections/HeaderSectionCentered';
import MapSection from '../components/Sections/MapSection';
import { REVALIDATE_PAGES } from '../utils/globals';

const MetaData = dynamic(() => import('../components/MetaData'));

interface Props {
  head: HeadModel;
  page: StockistsPageModel;
}

function Stockists(props: Props) {
  const { head, page } = props;
  const { headerSection } = page.stockistsPage;

  const theme = useTheme();
  const { white } = theme.palette.common;

  return (
    <>
      <MetaData head={head} />
      <AnimatedBackgroundWrapper color={white} immediate>
        <HeaderSectionCentered data={headerSection} />
        <MapSection />
      </AnimatedBackgroundWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const head = await getHead({ url: STOCKISTS_PAGE });
  const page = await getStockistsPage();

  const props: Props = {
    head,
    page,
  };

  return { props, notFound: page === null, revalidate: REVALIDATE_PAGES };
};
export default Stockists;
