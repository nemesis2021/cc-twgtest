import { Box, Stack, Typography, useTheme } from '@mui/material';
import { HeaderSectionCenteredModel } from '../../utils/models/sections/HeaderSectionCenteredModel';
import {
  MAX_WIDTH_SM,
  NAV_HEIGHT_MD,
  NAV_HEIGHT_XS,
} from '../../utils/styleGlobals';
import BreadCrumbs from '../Breadcrumbs';
import ContentContainer from '../ContentContainer';
import AnimatedImage from '../AnimatedImage';

interface Props {
  data: HeaderSectionCenteredModel;
  showImages?: boolean;
  currentPageTitle?: string;
}

export default function HeaderSectionCentered(props: Props) {
  const { data, showImages, currentPageTitle } = props;
  const { heading, description } = data;

  const theme = useTheme();
  const { primaryGreen, cementGrey } = theme.palette.common;
  const { md } = theme.breakpoints.values;

  return (
    <>
      <ContentContainer mt={{ xs: NAV_HEIGHT_XS + 1, md: NAV_HEIGHT_MD + 2 }}>
        <BreadCrumbs
          pb={3.75}
          displayHome
          currentPageTitle={currentPageTitle || heading}
        />
      </ContentContainer>
      <ContentContainer textAlign="center" maxWidth={MAX_WIDTH_SM}>
        {showImages && (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
            mb={3.75}
          >
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
        )}

        <Typography variant="h1" color={primaryGreen} mt={3.75}>
          {heading}
        </Typography>

        <Typography
          dangerouslySetInnerHTML={{ __html: description }}
          mt={5}
          color={cementGrey}
        />
      </ContentContainer>
    </>
  );
}
