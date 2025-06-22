import Head from 'next/head';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import ContentContainer from '../components/ContentContainer';
import Button from '../components/Buttons/Button';
import { HOME_PAGE } from '../utils/routes';
import {
  CONTENT_GAP_MD,
  NAV_HEIGHT_MD,
  SECTIONAL_GAP,
} from '../utils/styleGlobals';
import AnimatedImage from '../components/AnimatedImage';
import AnimatedBackgroundWrapper from '../components/AnimatedBackgroundWrapper';

export default function NotFoundPage() {
  const theme = useTheme();
  const { primaryGreen, cementGrey, white } = theme.palette.common;
  const { md } = theme.breakpoints.values;

  return (
    <>
      <Head>
        <title>Error: 404</title>
      </Head>
      <AnimatedBackgroundWrapper color={white} immediate>
        <ContentContainer
          component={Stack}
          gap={CONTENT_GAP_MD}
          minHeight={{ md: '50vh' }}
          textAlign="center"
          my={NAV_HEIGHT_MD}
          py={SECTIONAL_GAP}
          alignItems="center"
        >
          <Stack direction="row" justifyContent="center" alignItems="flex-end">
            <Box
              component="div"
              width={{ xs: 75, md: 92 }}
              height={{ xs: 84, md: 103 }}
              position="relative"
            >
              <AnimatedImage
                src="/images/toy1.png"
                alt="CapriCare toy 1"
                sizes={`(max-width: ${md}px) 20vw, 9vw`}
                objectFit="contain"
              />
            </Box>

            <Box
              component="div"
              width={{ xs: 182, md: 229 }}
              height={{ xs: 139, md: 175 }}
              position="relative"
            >
              <AnimatedImage
                src="/images/toy2.png"
                alt="CapriCare toy 2"
                sizes={`(max-width: ${md}px) 25vw, 24vw`}
                objectFit="contain"
              />
            </Box>

            <Box
              component="div"
              width={{ xs: 74, md: 89 }}
              height={{ xs: 95, md: 116 }}
              position="relative"
            >
              <AnimatedImage
                src="/images/toy3.png"
                alt="CapriCare toy 3"
                sizes={`(max-width: ${md}px) 20vw, 9vw`}
                objectFit="contain"
              />
            </Box>
          </Stack>
          <Typography variant="h3" color={primaryGreen} mb={-2}>
            404
          </Typography>
          <Typography variant="h1" color={primaryGreen}>
            Oops! Page not found
          </Typography>
          <div>
            <Typography color={cementGrey}>
              This page does not exist or was removed!
            </Typography>
            <Typography color={cementGrey}>
              We suggest you return to home.
            </Typography>
          </div>
          <Button label="Return To Homepage" href={HOME_PAGE} />
        </ContentContainer>
      </AnimatedBackgroundWrapper>
    </>
  );
}
