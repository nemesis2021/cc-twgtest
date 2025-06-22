import dynamic from 'next/dynamic';
import { GetStaticProps } from 'next/types';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { REVALIDATE_PAGES } from '../utils/globals';
import { HOME_PAGE } from '../utils/routes';
import getHead from '../utils/queries/rankmath/getHead';
import getHomePage from '../utils/queries/pages/getHomePage';
import getCTASection from '../utils/queries/globals/getCtaSection';
import getTestimonials from '../utils/queries/customPostTypes/getTestimonials';
import getBlogPostsSection from '../utils/queries/globals/getBlogPostsSection';
import getBenefitsFromProduct from '../utils/getBenefitsFromProduct';
import getTestimonialsSection from '../utils/queries/globals/getTestimonialsSection';
import type { HeadModel } from '../utils/models/rankmath/HeadModel';
import type { HomePageModel } from '../utils/models/pages/HomePageModel';
import type { CTASectionModel } from '../utils/models/sections/CTASectionModel';
import type { TestimonialModel } from '../utils/models/customPostTypes/TestimonialModel';
import type { BlogPostsSectionModel } from '../utils/models/customPostTypes/BlogPostModel';
import type { TestimonialsSectionModel } from '../utils/models/sections/TestimonialsSectionModel';
import AnimatedBackgroundWrapper from '../components/AnimatedBackgroundWrapper';
import HeaderSection from '../components/Sections/HomePage/HeaderSection';
import useWindowDimentions from '../utils/hooks/useWindowDimentions';
import HomePageCanView from '../components/R3F/Views/HomePageCanView';
import HomePageCanViewMobile from '../components/R3F/Views/HomePageCanViewMobile';

const MetaData = dynamic(() => import('../components/MetaData'));
const HomePageScene = dynamic(() => import('../components/R3F/HomePageScene'), {
  ssr: false,
});

const BenefitsSection = dynamic(
  () => import('../components/Sections/BenefitsSection'),
);
const ProductsSection = dynamic(
  () => import('../components/Sections/ProductsSection'),
);
const MediaContentSection = dynamic(
  () => import('../components/Sections/MediaContentSection'),
);
const CTASection = dynamic(() => import('../components/Sections/CTASection'));
const TestimonialsSection = dynamic(
  () => import('../components/Sections/TestimonialsSection'),
);
const MainContentSection = dynamic(
  () => import('../components/Sections/MainContentSection'),
);
const BlogPostsSection = dynamic(
  () => import('../components/Sections/BlogPostsSection'),
);
const SEOSection = dynamic(() => import('../components/Sections/SEOSection'));

interface Props {
  head: HeadModel;
  page: HomePageModel;
  ctaSection: CTASectionModel;
  testimonials: TestimonialModel[];
  blogPostSection: BlogPostsSectionModel;
  testimonialsSection: TestimonialsSectionModel;
}

function Home(props: Props) {
  const {
    head,
    page,
    testimonials,
    testimonialsSection,
    ctaSection,
    blogPostSection,
  } = props;
  const {
    featuredProduct,
    headerSection,
    productsSection,
    mainContentSection,
    mediaContentSection1,
    mediaContentSection2,
    seoSection,
  } = page.homePage;

  const [scrollPoint, setScrollPoint] = useState({
    x: 0,
    y: 0,
  });
  const [sectionHeights, setSectionHeights] = useState<number[]>([]);
  const [canvasReady, setCanvasReady] = useState(false);

  const { innerHeight } = useWindowDimentions();

  const theme = useTheme();
  const { dirtyWhite, white, bgBlue, bgGreen, bgRed } = theme.palette.common;
  const { md } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));

  const { wrapper } = featuredProduct.nodes[0].productFields;

  const renderBenefitsSection = useMemo(() => {
    const benefits = getBenefitsFromProduct(featuredProduct.nodes[0]);
    const productImage = featuredProduct.nodes[0].image;

    if (!benefits) {
      return null;
    }

    return (
      <AnimatedBackgroundWrapper color={bgBlue}>
        <BenefitsSection
          onHeight={(v) => updateHeight(1, v)}
          benefits={benefits?.list}
          productImage={productImage}
          color={featuredProduct.nodes[0].productFields.colors.primaryColor}
        />
      </AnimatedBackgroundWrapper>
    );
  }, [bgBlue, featuredProduct.nodes]);

  const updateHeight = (index: number, height: number) => {
    setSectionHeights((prev) => {
      const newHeights = [...prev];
      newHeights[index] = height;
      return newHeights;
    });
  };

  const portal = useMemo(() => {
    if (typeof window === 'undefined') return null;

    return createPortal(
      <HomePageScene setCanvasReady={setCanvasReady} />,
      document.getElementById('__next')!,
    );
  }, []);

  const handleSetScrollPoint = (x: number, y: number) => {
    setScrollPoint({
      x,
      y,
    });
  };

  return (
    <>
      <MetaData head={head} />

      {portal}
      {isTablet && (
        <HomePageCanView
          wrapper={wrapper}
          canvasReady={canvasReady}
          sectionHeights={sectionHeights}
          scrollPoint={scrollPoint}
        />
      )}
      <AnimatedBackgroundWrapper
        color={bgRed}
        immediate
        threshold={0.2}
        rootMargin="-50% 0px 0px 0px"
      >
        <HeaderSection
          onHeight={(v) => updateHeight(0, v)}
          data={headerSection}
        />

        {!isTablet && (
          <Box component="div" position="relative" height="100vh">
            <HomePageCanViewMobile
              wrapper={wrapper}
              canvasReady={canvasReady}
              sectionHeights={[sectionHeights[0], innerHeight]}
            />
          </Box>
        )}
      </AnimatedBackgroundWrapper>

      {renderBenefitsSection}
      <AnimatedBackgroundWrapper color={dirtyWhite}>
        <ProductsSection
          sectionIndex={2}
          setSectionHeights={setSectionHeights}
          data={productsSection}
          canvasReady={canvasReady}
          featuredProductId={featuredProduct?.nodes[0]?.databaseId}
          handleSetScrollPoint={handleSetScrollPoint}
        />
      </AnimatedBackgroundWrapper>
      <AnimatedBackgroundWrapper color={dirtyWhite}>
        <MainContentSection data={mainContentSection} />
      </AnimatedBackgroundWrapper>
      <AnimatedBackgroundWrapper color={bgGreen}>
        <TestimonialsSection
          data={testimonialsSection}
          testimonials={testimonials}
        />
      </AnimatedBackgroundWrapper>
      <AnimatedBackgroundWrapper color={white}>
        <MediaContentSection data={mediaContentSection1} />
      </AnimatedBackgroundWrapper>
      <AnimatedBackgroundWrapper color={white}>
        <MediaContentSection data={mediaContentSection2} />
        <CTASection data={ctaSection} />
        <BlogPostsSection data={blogPostSection} />
        <SEOSection data={seoSection} />
      </AnimatedBackgroundWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const page = await getHomePage();
  const head = await getHead({ url: HOME_PAGE });
  const testimonials = await getTestimonials({ first: 20 });
  const testimonialsSection = await getTestimonialsSection();
  const blogPostSection = await getBlogPostsSection();
  const ctaSection = await getCTASection();

  const props: Props = {
    head,
    page,
    testimonials,
    testimonialsSection,
    blogPostSection,
    ctaSection,
  };

  return { props, notFound: page === null, revalidate: REVALIDATE_PAGES };
};

export default Home;
