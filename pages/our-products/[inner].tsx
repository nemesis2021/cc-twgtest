import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { OUR_PRODUCTS_PAGE, PRODUCT_PATH } from '../../utils/routes';
import { BASE_URL, CMS_URL, REVALIDATE_PAGES } from '../../utils/globals';
import getHead from '../../utils/queries/rankmath/getHead';
import getProduct from '../../utils/queries/woocommerce/getProduct';
import getBlogPostsSection from '../../utils/queries/globals/getBlogPostsSection';
import getTestimonialsSection from '../../utils/queries/globals/getTestimonialsSection';
import getTestimonials from '../../utils/queries/customPostTypes/getTestimonials';
import getCTASection from '../../utils/queries/globals/getCtaSection';
import getBenefitsFromProduct from '../../utils/getBenefitsFromProduct';
import type { HeadModel } from '../../utils/models/rankmath/HeadModel';
import type { TestimonialsSectionModel } from '../../utils/models/sections/TestimonialsSectionModel';
import type { BlogPostsSectionModel } from '../../utils/models/customPostTypes/BlogPostModel';
import type { TestimonialModel } from '../../utils/models/customPostTypes/TestimonialModel';
import type { ProductModel } from '../../utils/models/woocommerce/ProductModel';
import type { CTASectionModel } from '../../utils/models/sections/CTASectionModel';
import MainContentSection from '../../components/Sections/MainContentSection';
import ProductInnerScene from '../../components/R3F/ProductInnerScene';

const AnimatedBackgroundWrapper = dynamic(
  () => import('../../components/AnimatedBackgroundWrapper'),
  { ssr: false },
);
const MetaData = dynamic(() => import('../../components/MetaData'));
const TestimonialsSection = dynamic(
  () => import('../../components/Sections/TestimonialsSection'),
);
const BlogPostsSection = dynamic(
  () => import('../../components/Sections/BlogPostsSection'),
);
const ProductDetailsSection = dynamic(
  () =>
    import('../../components/Sections/OurProductsInner/ProductDetailsSection'),
  { ssr: false },
);

const FaqWithSearchSection = dynamic(
  () => import('../../components/Sections/FaqWithSearchSection'),
);
const BenefitsSection = dynamic(
  () => import('../../components/Sections/BenefitsSection'),
);
const CTASection = dynamic(
  () => import('../../components/Sections/CTASection'),
);

interface Props {
  head: HeadModel;
  page: ProductModel;
  testimonialsSection: TestimonialsSectionModel;
  blogPostsSection: BlogPostsSectionModel;
  testimonials: TestimonialModel[];
  ctaSection: CTASectionModel;
}

export default function Product(props: Props) {
  const {
    head,
    page,
    testimonialsSection,
    blogPostsSection,
    testimonials,
    ctaSection,
  } = props;
  const { mainContentSection, faqSection, colors } = page.productFields;
  const [canvasReady, setCanvasReady] = useState(false);
  const [sectionHeights, setSectionHeights] = useState<number[]>([]);
  const [selectedGallery, setSelectedGallery] = useState(0);
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById('__next');
  }, []);

  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));
  const { white, bgGreen } = theme.palette.common;

  const renderBenefitsSection = useMemo(() => {
    const benefits = getBenefitsFromProduct(page);
    const productImage = page.image;

    if (!benefits) {
      return null;
    }

    return (
      <BenefitsSection
        benefits={benefits.list}
        productImage={productImage}
        onHeight={(v) => updateHeight(1, v)}
        showProduct={selectedGallery !== 0}
        color={colors.primaryColor}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedGallery]);

  const portal = useMemo(() => {
    if (typeof window === 'undefined') return null;
    if (!isTablet) return null;

    return createPortal(
      <ProductInnerScene setCanvasReady={setCanvasReady} />,
      document.getElementById('__next')!,
    );
  }, [isTablet]);

  const updateHeight = (index: number, height: number) => {
    setSectionHeights((prev) => {
      const newHeights = [...prev];
      newHeights[index] = height;
      return newHeights;
    });
  };

  return (
    <>
      <MetaData head={head} />
      {portal}
      <AnimatedBackgroundWrapper
        color={page.productFields.colors.secondaryColor}
        immediate
        threshold={0.3}
      >
        <ProductDetailsSection
          data={page}
          onHeight={(v) => updateHeight(0, v)}
          sectionHeights={sectionHeights}
          selectedGallery={selectedGallery}
          setSelectedGallery={setSelectedGallery}
          canvasReady={canvasReady}
        />

        {renderBenefitsSection}
      </AnimatedBackgroundWrapper>
      <AnimatedBackgroundWrapper color={white}>
        <MainContentSection data={mainContentSection} />
      </AnimatedBackgroundWrapper>
      {testimonials.length > 0 && (
        <AnimatedBackgroundWrapper color={bgGreen}>
          <TestimonialsSection
            data={testimonialsSection}
            testimonials={testimonials}
          />
        </AnimatedBackgroundWrapper>
      )}
      {faqSection.faqs.length > 0 && (
        <AnimatedBackgroundWrapper color={white}>
          <FaqWithSearchSection data={faqSection} search={false} mt={0} />
        </AnimatedBackgroundWrapper>
      )}
      <AnimatedBackgroundWrapper color={white}>
        <CTASection data={ctaSection} />
        {blogPostsSection.blogPosts.nodes.length > 0 && (
          <BlogPostsSection data={blogPostsSection} />
        )}
      </AnimatedBackgroundWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = `${params?.inner}`;

  const page = await getProduct({
    id: slug,
  });

  const blogPostsSection = await getBlogPostsSection();
  const ctaSection = await getCTASection();
  const testimonialsSection = await getTestimonialsSection();
  const testimonials = await getTestimonials({
    first: 20,
  });

  const head = await getHead(
    {
      url: `${PRODUCT_PATH}/${slug}`,
    },
    {
      searchValue: `${CMS_URL}${PRODUCT_PATH}`,
      replaceValue: `${BASE_URL}${OUR_PRODUCTS_PAGE}`,
    },
  );

  const props: Props = {
    page,
    head,
    testimonialsSection,
    blogPostsSection,

    testimonials,
    ctaSection,
  };

  return {
    props: { ...props, key: slug },
    notFound: page === null,
    revalidate: REVALIDATE_PAGES,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
});
