import { styled, Grid, useTheme, Box, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import type { MenuModel } from '../../utils/models/MenuModel';
import type { NavLinkModel } from '../../utils/models/NavLinkModel';
import addNavLink from '../../utils/addNavLink';
import ContentContainer from '../ContentContainer';
import { HOME_PAGE } from '../../utils/routes';
import { FooterContentModel } from '../../utils/models/NavigationModel';
import { ImageModel } from '../../utils/models/ImageModel';
import AnimatedHoverZoomWrapper from '../Animation/AnimatedHoverZoomWrapper';
import AnimatedImage from '../AnimatedImage';

import FooterNavigation from './FooterNavigation';
import WysiwygStyledTypography from '../WysiwygStyledTypography';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.common.bgGreen,
  [theme.breakpoints.up('xs')]: {
    paddingTop: theme.spacing(11.5),
    paddingBottom: theme.spacing(2.5),
  },
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(7.5),
    paddingTop: theme.spacing(7.5),
  },
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
}));

interface Props {
  menu?: MenuModel;
  logo?: ImageModel;
  footerContent?: FooterContentModel;
}

export default function Footer(props: Props) {
  const { menu, logo, footerContent } = props;
  const navLinks: NavLinkModel[] = [];
  menu?.menuItems.nodes.map((node) => addNavLink(navLinks, node));

  const theme = useTheme();
  const { primaryGreen, cementGrey } = theme.palette.common;

  return (
    <Root>
      <ContentContainer>
        <Grid container justifyContent="space-between" rowGap={5}>
          <Grid
            item
            xs={12}
            md={3}
            textAlign={{ xs: 'center', md: 'initial' }}
            mt={-0.4}
            display="flex"
            flexDirection="column"
            alignItems={{ xs: 'center', lg: 'flex-start' }}
          >
            <AnimatedHoverZoomWrapper>
              <Link
                href={HOME_PAGE}
                style={{ display: 'flex' }}
                aria-label="CapriCare"
              >
                <Box
                  component="div"
                  width={{ xs: 157, md: 193 }}
                  height={{ xs: 82, md: 101 }}
                  position="relative"
                  mb={3.5}
                >
                  <AnimatedImage
                    src={logo?.node.sourceUrl}
                    alt={logo?.node.altText}
                    sizes="13.5vw"
                    objectFit="contain"
                  />
                </Box>
              </Link>
            </AnimatedHoverZoomWrapper>

            {footerContent?.description && (
              <WysiwygStyledTypography
                maxWidth={350}
                color={cementGrey}
                text={footerContent?.description}
              />
            )}
          </Grid>
          <Grid item xs={12} md={8}>
            <FooterNavigation
              navLinks={navLinks}
              footerContent={footerContent}
            />
          </Grid>
        </Grid>
        <Stack mt={{ xs: 5, md: 7.5 }}>
          <Typography variant="body3" color={primaryGreen}>
            {footerContent?.copyright}
          </Typography>
          <Typography variant="body3" color={primaryGreen}>
            {footerContent?.statement}
          </Typography>
        </Stack>
      </ContentContainer>
    </Root>
  );
}
