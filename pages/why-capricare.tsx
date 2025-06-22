import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { GetStaticProps } from 'next/types';
import { REVALIDATE_PAGES } from '../utils/globals';
import { WHY_CAPRICARE_PAGE } from '../utils/routes';
import getHead from '../utils/queries/rankmath/getHead';
import getWhyCapricarePage from '../utils/queries/pages/getWhyCapricarePage';
import getBenefitsFromProduct from '../utils/getBenefitsFromProduct';
import type { HeadModel } from '../utils/models/rankmath/HeadModel';
import type { WhyCapricarePageModel } from '../utils/models/pages/WhyCapricarePageModel';
import GeneralHeaderSection from '../components/Sections/GeneralHeaderSection';
import AnimatedBackgroundWrapper from '../components/AnimatedBackgroundWrapper';

const MetaData = dynamic(() => import('../components/MetaData'));
const MainContentSection = dynamic(
  () => import('../components/Sections/MainContentSection'),
);
const BenefitsSection = dynamic(
  () => import('../components/Sections/BenefitsSection'),
);
const SEOSection = dynamic(() => import('../components/Sections/SEOSection'));

interface Props {
  head: HeadModel;
  page: WhyCapricarePageModel;
}

function WhyCapricare(props: Props) {
  const { head, page } = props;
  const {
    generalHeaderSection,
    mainContentSection,
    benefitsSection,
    seoSection,
  } = page.whyCapricarePage;

  const theme = useTheme();
  const { bgBlue, white, bgGreen } = theme.palette.common;

  const renderBenefitsSection = useMemo(() => {
    const benefits = getBenefitsFromProduct(benefitsSection.product.nodes[0]);
    const productImage = benefitsSection.product.nodes[0].image;

    if (!benefits) {
      return null;
    }

    return (
      <AnimatedBackgroundWrapper color={bgBlue}>
        <BenefitsSection
          benefits={benefits.list}
          showProduct
          productImage={productImage}
          color={
            benefitsSection.product.nodes[0].productFields.colors.primaryColor
          }
        />
      </AnimatedBackgroundWrapper>
    );
  }, [benefitsSection.product, bgBlue]);

  return (
    <>
      <MetaData head={head} />
      <AnimatedBackgroundWrapper color={bgGreen} immediate>
        <GeneralHeaderSection data={generalHeaderSection} />
      </AnimatedBackgroundWrapper>
      <AnimatedBackgroundWrapper color={white}>
        <MainContentSection data={mainContentSection} />
      </AnimatedBackgroundWrapper>
      {renderBenefitsSection}
      <AnimatedBackgroundWrapper color={white}>
        <SEOSection data={seoSection} />
      </AnimatedBackgroundWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const page = await getWhyCapricarePage();
  const head = await getHead({
    url: WHY_CAPRICARE_PAGE,
  });

  const props: Props = {
    head,
    page,
  };

  return {
    props,
    notFound: page === null,
    revalidate: REVALIDATE_PAGES,
  };
};

export default WhyCapricare;
