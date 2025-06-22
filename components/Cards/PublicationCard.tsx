import Link from 'next/link';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { PublicationPartialModel } from '../../utils/models/customPostTypes/PublicationModel';
import AnimatedImage from '../AnimatedImage';
import WysiwygStyledTypography from '../WysiwygStyledTypography';
import AnimatedHoverZoomWrapper from '../Animation/AnimatedHoverZoomWrapper';

import DownloadIcon from '../../assets/icons/download.svg';

interface Props {
  data: PublicationPartialModel;
  applyToGrid?: boolean;
}

export default function PublicationCard(props: Props) {
  const { data, applyToGrid = false } = props;
  const { title, publicationPostType, categories } = data;
  const { shortDescription, thumbnail, file } = publicationPostType;

  const theme = useTheme();
  const { divider } = theme.palette;
  const { cementGrey, primaryGreen } = theme.palette.common;
  const { md } = theme.breakpoints.values;

  return (
    <Link
      href={file?.node.mediaItemUrl}
      draggable={false}
      aria-label={file?.node.title || title}
      target="_blank"
    >
      <AnimatedHoverZoomWrapper
        hoverScale={0.95}
        height="100%"
        border={`1px solid ${divider}`}
        borderRadius="20px"
        position="relative"
        overflow="hidden"
      >
        <Box
          component="div"
          color={cementGrey}
          width={
            applyToGrid ? '100%' : { xs: 398, xl: 540, xxl: 600, xxxl: 700 }
          }
        >
          <Box
            component="div"
            width="100%"
            position="relative"
            overflow="hidden"
            sx={{ aspectRatio: 3 }}
          >
            <AnimatedImage
              src={thumbnail?.node.sourceUrl}
              alt={thumbnail?.node.altText}
              sizes={`(max-width: ${md}px) 90vw, 25vw`}
            />
          </Box>
          <Stack direction="column" p={2.5} rowGap={2}>
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
            <Typography variant="h5" component="p">
              {title}
            </Typography>
            {shortDescription && (
              <WysiwygStyledTypography
                typographyVariant="body2"
                text={shortDescription}
              />
            )}

            <Stack direction="row" gap={0.75} alignItems="center">
              <DownloadIcon width={24} height={24} />
              <Typography variant="button" sx={{ textDecoration: 'underline' }}>
                Donwload
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </AnimatedHoverZoomWrapper>
    </Link>
  );
}
