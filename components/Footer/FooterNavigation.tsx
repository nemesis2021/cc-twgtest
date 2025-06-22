import {
  Grid,
  Stack,
  useTheme,
  useMediaQuery,
  Typography,
} from '@mui/material';
import type { NavLinkModel } from '../../utils/models/NavLinkModel';
import AnimationFadeIn from '../Animation/AnimationFadeIn';
import { FooterContentModel } from '../../utils/models/NavigationModel';
import NavLinkButton from '../Buttons/NavLinkButton';
import Button from '../Buttons/Button';
import Accordion from '../Accordion';

interface FooterNavigationProps {
  navLinks: NavLinkModel[];
  footerContent?: FooterContentModel;
}

export default function FooterNavigation({
  navLinks,
  footerContent,
}: FooterNavigationProps) {
  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));
  const { cementGrey } = theme.palette.common;

  const convertNavLinksToAccordionItems = navLinks.map((navLink) => ({
    title: navLink.label,
    body: (
      <Stack rowGap={2.5} pt={3.75}>
        {navLink.children?.map((navLinkChild) => (
          <NavLinkButton navLink={navLinkChild} />
        ))}
      </Stack>
    ),
  }));

  return (
    <Grid container rowSpacing={5}>
      {isTablet ? (
        navLinks.map((navLink) => (
          <Grid item xs={12} md={6} lg={3} key={navLink.id}>
            <Typography py={3} variant="button" color={cementGrey}>
              {navLink.label}
            </Typography>

            {navLink.children.length > 0 && (
              <Stack rowGap={2.5} pt={3.75}>
                {navLink.children.map((navLinkChild, childIndex) => (
                  <AnimationFadeIn
                    key={navLinkChild.id}
                    delay={200 * childIndex}
                  >
                    <NavLinkButton navLink={navLinkChild} />
                  </AnimationFadeIn>
                ))}
              </Stack>
            )}
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Accordion data={convertNavLinksToAccordionItems} variant="dark" />
        </Grid>
      )}

      <Grid item xs={12} md={6} lg={5}>
        <Stack rowGap={{ xs: 2.5, md: 3.6 }}>
          <Typography variant="button" color={cementGrey}>
            {footerContent?.featuredPage.title}
          </Typography>
          <Typography color={cementGrey} variant="body2">
            {footerContent?.featuredPage.description}
          </Typography>
          {footerContent?.featuredPage?.link && (
            <Button
              label={footerContent?.featuredPage?.link.title}
              href={footerContent?.featuredPage?.link.url}
            />
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
