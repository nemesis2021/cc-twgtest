import Link from 'next/link';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { BlogPostPartialModel } from '../../utils/models/customPostTypes/BlogPostModel';
import AnimatedImage from '../AnimatedImage';
import WysiwygStyledTypography from '../WysiwygStyledTypography';
import { BLOG_HUB_PAGE } from '../../utils/routes';
import AnimatedHoverZoomWrapper from '../Animation/AnimatedHoverZoomWrapper';

interface Props {
  data: BlogPostPartialModel;
  applyToGrid?: boolean;
  showReadMore?: boolean;
}

export default function BlogPostCard(props: Props) {
  const { data, applyToGrid = false, showReadMore = false } = props;
  const { title, blogPostType, categories, slug } = data;
  const { shortDescription, thumbnail } = blogPostType;

  const theme = useTheme();
  const { cementGrey, primaryGreen } = theme.palette.common;
  const { md } = theme.breakpoints.values;

  return (
    <Link
      href={`${BLOG_HUB_PAGE}/${slug}`}
      draggable={false}
      aria-label={title}
    >
      <AnimatedHoverZoomWrapper hoverScale={0.95}>
        <Box
          component="div"
          color={cementGrey}
          width={
            applyToGrid ? '100%' : { xs: 298, xl: 320, xxl: 340, xxxl: 370 }
          }
        >
          <Box
            component="div"
            width="100%"
            position="relative"
            borderRadius="20px"
            overflow="hidden"
            sx={{ aspectRatio: 1 }}
            mb={3}
          >
            <AnimatedImage
              src={thumbnail?.node.sourceUrl}
              alt={thumbnail?.node.altText}
              sizes={`(max-width: ${md}px) 90vw, 25vw`}
            />
          </Box>
          {categories.nodes && categories.nodes.length > 0 && (
            <Stack
              direction="row"
              flexWrap="wrap"
              columnGap={2}
              color={primaryGreen}
              alignContent="baseline"
            >
              {categories.nodes.map((cateogry) => (
                <Typography variant="label" textTransform="uppercase">
                  {cateogry.name}
                </Typography>
              ))}
            </Stack>
          )}
          <Typography variant="h5" my={2} component="p">
            {title}
          </Typography>
          <WysiwygStyledTypography
            mb={1.6}
            typographyVariant="body2"
            text={shortDescription}
          />
          {showReadMore && <Typography variant="label">Read More</Typography>}
        </Box>
      </AnimatedHoverZoomWrapper>
    </Link>
  );
}
