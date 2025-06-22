import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import {
  BlockTypeEnum,
  FlexibleBlockType,
} from '../../utils/models/FlexibleBlocksModel';
import WysiwygStyledTypography from '../WysiwygStyledTypography';
import AnimatedImage from '../AnimatedImage';
import { BORDER_RADIUS, CONTENT_GAP } from '../../utils/styleGlobals';
import Video from '../Video';
import AnimatedDivider from '../AnimatedDivider';
import Button from '../Buttons/Button';

interface Props {
  flexibleBlock: FlexibleBlockType;
  flexibleBlockPrefix: string;
}

export default function FlexibleBlock(props: Props) {
  const { flexibleBlock, flexibleBlockPrefix } = props;

  const theme = useTheme();
  const { primaryGreen, strawberryRed } = theme.palette.common;

  if (
    // eslint-disable-next-line no-underscore-dangle
    flexibleBlock.__typename ===
    (`${flexibleBlockPrefix}${BlockTypeEnum.QuoteBlock}Layout` as BlockTypeEnum.QuoteBlock)
  ) {
    return (
      <Typography
        textAlign="center"
        variant="h5"
        color={primaryGreen}
        px={{ xs: 0, md: 2.5, xxl: 4 }}
      >
        {flexibleBlock.body}
      </Typography>
    );
  }

  if (
    // eslint-disable-next-line no-underscore-dangle
    flexibleBlock.__typename ===
    (`${flexibleBlockPrefix}${BlockTypeEnum.ParagraphBlock}Layout` as BlockTypeEnum.ParagraphBlock)
  ) {
    return <WysiwygStyledTypography text={flexibleBlock.body ?? ''} />;
  }
  if (
    // eslint-disable-next-line no-underscore-dangle
    flexibleBlock.__typename ===
    (`${flexibleBlockPrefix}${BlockTypeEnum.ReferencesBlock}Layout` as BlockTypeEnum.ReferencesBlock)
  ) {
    return (
      <Box component="div" mt={4}>
        <AnimatedDivider />
        <WysiwygStyledTypography
          typographyVariant="body3"
          text={flexibleBlock.body ?? ''}
        />
      </Box>
    );
  }

  if (
    // eslint-disable-next-line no-underscore-dangle
    flexibleBlock.__typename ===
      (`${flexibleBlockPrefix}${BlockTypeEnum.GalleryBlock}Layout` as BlockTypeEnum.GalleryBlock) &&
    flexibleBlock.gallery &&
    flexibleBlock.gallery?.nodes.length > 0
  ) {
    const { gallery } = flexibleBlock;

    const getGridColumnSize = () => {
      const { length } = gallery.nodes;
      switch (length) {
        case 1:
          return 12;
        case 2:
          return 6;
        case 3:
          return 4;
        default:
          return 4;
      }
    };

    return (
      <Grid container spacing={2.5}>
        {gallery.nodes.map(({ sourceUrl, altText }) => (
          <Grid item xs={12} md={getGridColumnSize()}>
            <Box
              component="div"
              borderRadius={BORDER_RADIUS}
              position="relative"
              width="100%"
              sx={{ aspectRatio: gallery.nodes.length === 1 ? '1.41' : '0.97' }}
              overflow="hidden"
            >
              <AnimatedImage src={sourceUrl} alt={altText} sizes="100vw" />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (
    // eslint-disable-next-line no-underscore-dangle
    flexibleBlock.__typename ===
      (`${flexibleBlockPrefix}${BlockTypeEnum.VideoBlock}Layout` as BlockTypeEnum.VideoBlock) &&
    (flexibleBlock.videoFile || flexibleBlock.videoLink)
  ) {
    const { videoFile, videoLink, thumbnail } = flexibleBlock;

    const renderMedia = () => {
      if (videoLink) {
        return (
          <Video
            video={{
              url: videoLink,
            }}
            fallbackImage={thumbnail || undefined}
          />
        );
      }
      if (videoFile) {
        return (
          <Video
            video={{
              url: videoFile.node.mediaItemUrl,
            }}
            fallbackImage={thumbnail || undefined}
          />
        );
      }

      return null;
    };

    return (
      <Box
        component="div"
        width="100%"
        height={{ xs: '62.93vw', md: '41.52vw' }}
        maxHeight={{ xs: 267, md: 615 }}
        position="relative"
        borderRadius={BORDER_RADIUS}
        overflow="hidden"
      >
        {renderMedia()}
      </Box>
    );
  }

  if (
    // eslint-disable-next-line no-underscore-dangle
    flexibleBlock.__typename ===
      (`${flexibleBlockPrefix}${BlockTypeEnum.GraphBlock}Layout` as BlockTypeEnum.GraphBlock) &&
    flexibleBlock.image
  ) {
    const { mediaDetails } = flexibleBlock.image.node;
    const aspectRatio =
      mediaDetails?.width && mediaDetails?.height
        ? `${mediaDetails.width / mediaDetails.height}`
        : 1;

    return (
      <Box
        component="div"
        borderRadius={BORDER_RADIUS}
        position="relative"
        width="100%"
        sx={{ aspectRatio }}
        overflow="hidden"
      >
        <AnimatedImage
          src={flexibleBlock.image.node.sourceUrl}
          alt={flexibleBlock.image.node.altText}
          sizes="100vw"
        />
      </Box>
    );
  }

  if (
    // eslint-disable-next-line no-underscore-dangle
    flexibleBlock.__typename ===
      (`${flexibleBlockPrefix}${BlockTypeEnum.LinksBlock}Layout` as BlockTypeEnum.LinksBlock) &&
    flexibleBlock.links &&
    flexibleBlock.links.length > 0
  ) {
    return (
      <Stack direction="row" gap={3} flexWrap="wrap" mt={CONTENT_GAP}>
        {flexibleBlock.links.map((item) => (
          <Button
            href={item.link.url}
            label={item.link.title}
            target={item.link.target || '_blank'}
          />
        ))}
      </Stack>
    );
  }

  return (
    <Typography color={strawberryRed}>
      An error occured: Block not supported.
    </Typography>
  );
}
