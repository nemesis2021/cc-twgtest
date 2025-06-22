import Link from 'next/link';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { ClinicalStudyPartialModel } from '../../utils/models/customPostTypes/ClinicalStudyModel';
import AnimatedImage from '../AnimatedImage';
import { CLINICAL_STUDIES_PAGE } from '../../utils/routes';
import AnimatedHoverZoomWrapper from '../Animation/AnimatedHoverZoomWrapper';

interface Props {
  data: ClinicalStudyPartialModel;
  applyToGrid?: boolean;
  showReadMore?: boolean;
}

export default function ClinicalStudyCard(props: Props) {
  const { data, applyToGrid = false, showReadMore = false } = props;
  const { title, clinicalStudyPostType, featuredImage, slug } = data;
  const { source } = clinicalStudyPostType;

  const theme = useTheme();
  const { cementGrey, primaryGreen } = theme.palette.common;
  const { md } = theme.breakpoints.values;

  return (
    <Link
      href={`${CLINICAL_STUDIES_PAGE}/${slug}`}
      draggable={false}
      aria-label={title}
    >
      <AnimatedHoverZoomWrapper hoverScale={0.95}>
        <Stack
          direction="column"
          color={cementGrey}
          gap={2}
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
            sx={{ aspectRatio: 1.87 }}
          >
            <AnimatedImage
              src={featuredImage?.node.sourceUrl}
              alt={featuredImage?.node.altText}
              sizes={`(max-width: ${md}px) 90vw, 25vw`}
            />
          </Box>
          <Typography variant="label" color={primaryGreen} mt={2}>
            Clinical Study
          </Typography>
          <Typography variant="h5" component="p">
            {title}
          </Typography>
          <Typography variant="body3">{source}</Typography>

          {showReadMore && (
            <Typography variant="label" sx={{ textDecoration: 'underline' }}>
              Read More
            </Typography>
          )}
        </Stack>
      </AnimatedHoverZoomWrapper>
    </Link>
  );
}
