import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import {
  BORDER_RADIUS,
  CONTENT_GAP,
  NAV_HEIGHT_MD,
  NAV_HEIGHT_XS,
} from '../../utils/styleGlobals';
import WysiwygStyledTypography from '../WysiwygStyledTypography';
import BreadCrumbs from '../Breadcrumbs';
import Video from '../Video';
import AnimatedImage from '../AnimatedImage';
import { GeneralHeaderSectionModel } from '../../utils/models/sections/GeneralHeaderSectionModel';
import ContentContainer from '../ContentContainer';
import Button from '../Buttons/Button';

interface Props {
  data: GeneralHeaderSectionModel;
  currentPageTitle?: string;
}

export default function GeneralHeaderSection(props: Props) {
  const { data, currentPageTitle } = props;
  const { heading, body, image, smallerMedia = false, link } = data;
  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const { primaryGreen, cementGrey } = theme.palette.common;

  const formatHeading = useMemo(() => {
    if (!heading) return '';

    const newHeading = heading.split(/(®)/g).map((part) =>
      part === '®' ? (
        <span
          style={{
            fontSize: '60%',
            transform: 'translateY(-25%)',
            display: 'inline-block',
          }}
        >
          {part}
        </span>
      ) : (
        part
      ),
    );

    return newHeading;
  }, [heading]);

  return (
    <ContentContainer mt={{ xs: NAV_HEIGHT_XS + 1, md: NAV_HEIGHT_MD + 2 }}>
      <BreadCrumbs
        displayHome
        currentPageTitle={currentPageTitle || data.heading}
      />
      <Grid container px={{ lg: 5 }}>
        <Grid
          item
          xs={12}
          lg={smallerMedia ? 6 : 5}
          pr={{ lg: 6.25 }}
          display="flex"
          alignItems="center"
          order={{ xs: 2, lg: 1 }}
          mt={{ xs: 3.75, lg: 9 }}
        >
          <Stack gap={CONTENT_GAP} maxWidth={{ xxl: 730, xxxl: 800 }} pb={4}>
            <Typography variant="h1" color={primaryGreen}>
              {formatHeading}
            </Typography>
            <WysiwygStyledTypography color={cementGrey} text={body ?? ''} />
            {link && <Button label={link.title} href={link.url} />}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          lg={smallerMedia ? 6 : 7}
          order={{ xs: 1, lg: 2 }}
          mt={{ xs: 3.75, lg: 0 }}
        >
          <Box
            component="div"
            position="relative"
            width="100%"
            minHeight={{ lg: '80vh' }}
            sx={{ aspectRatio: smallerMedia ? '1' : '375/233' }}
            borderRadius={BORDER_RADIUS}
            overflow="hidden"
          >
            {data.video ? (
              <Video
                video={{
                  url: data.video.node.mediaItemUrl,
                }}
                fallbackImage={data.image}
                autoPlay
                loop
                muted
              />
            ) : (
              <AnimatedImage
                src={image?.node?.sourceUrl || ''}
                sizes={`(max-width: ${md}px) 100vw, 66.66vw`}
                priority
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </ContentContainer>
  );
}
