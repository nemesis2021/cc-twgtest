import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import ContentContainer from '../ContentContainer';
import { BASE_URL } from '../../utils/globals';

import Facebook from '../../assets/icons/Facebook.svg';
import Instagram from '../../assets/icons/Instagram.svg';
import LinkedIn from '../../assets/icons/LinkedIn.svg';
import AnimatedDivider from '../AnimatedDivider';
import { CONTENT_GAP_XS, SECTIONAL_GAP } from '../../utils/styleGlobals';
import AnimatedHoverZoomWrapper from '../Animation/AnimatedHoverZoomWrapper';

export default function SocialShareSection() {
  const theme = useTheme();
  const { primaryGreen } = theme.palette.common;

  const { asPath } = useRouter();

  const facebookShareLink = `https://www.facebook.com/sharer/sharer.php?u=${BASE_URL}${asPath}`;
  const linkedInShareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${BASE_URL}${asPath}`;
  const instagramShareLink = `https://www.instagram.com/sharing/share-offsite/?url=${BASE_URL}${asPath}`;

  const handleShare = (link: string) => {
    if (typeof window !== 'undefined') {
      window.open(link);
    }
  };

  return (
    <ContentContainer my={SECTIONAL_GAP} color={primaryGreen}>
      <AnimatedDivider />
      <Stack direction="row" justifyContent="space-between" my={CONTENT_GAP_XS}>
        <Typography variant="body1" fontWeight="bold">
          Share this article:
        </Typography>
        <Stack direction="row" alignItems="center" gap={3.75}>
          <AnimatedHoverZoomWrapper>
            <Box
              component="div"
              onClick={() => handleShare(facebookShareLink)}
              sx={{ cursor: 'pointer' }}
            >
              <Facebook width={21} height={21} color={primaryGreen} />
            </Box>
          </AnimatedHoverZoomWrapper>
          <AnimatedHoverZoomWrapper>
            <Box
              component="div"
              onClick={() => handleShare(instagramShareLink)}
              sx={{ cursor: 'pointer' }}
            >
              <Instagram width={21} height={21} color={primaryGreen} />
            </Box>
          </AnimatedHoverZoomWrapper>
          <AnimatedHoverZoomWrapper>
            <Box
              component="div"
              onClick={() => handleShare(linkedInShareLink)}
              sx={{ cursor: 'pointer' }}
            >
              <LinkedIn width={21} height={21} color={primaryGreen} />
            </Box>
          </AnimatedHoverZoomWrapper>
        </Stack>
      </Stack>
      <AnimatedDivider />
    </ContentContainer>
  );
}
