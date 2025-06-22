import {
  AppBar,
  Box,
  Stack,
  styled,
  Typography,
  useScrollTrigger,
  useTheme,
} from '@mui/material';
import { useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useScroll } from '@use-gesture/react';
import Link from 'next/link';
import addNavLink from '../../utils/addNavLink';
import type { MenuModel } from '../../utils/models/MenuModel';
import type { ImageModel } from '../../utils/models/ImageModel';
import type { NavLinkModel } from '../../utils/models/NavLinkModel';
import type { HeaderContentModel } from '../../utils/models/NavigationModel';
import { HOME_PAGE } from '../../utils/routes';
import NavLinkButton from '../Buttons/NavLinkButton';
import ContentContainer from '../ContentContainer';
import Button from '../Buttons/Button';
import AnimatedHoverZoomWrapper from '../Animation/AnimatedHoverZoomWrapper';
import AnimatedImage from '../AnimatedImage';

const ABox = animated(Box);

const StyledAppBar = styled(animated(AppBar))(() => ({
  color: 'unset',
  background: 'transparent',
  pointerEvents: 'none',
}));

const StyledContentContainer = styled(ContentContainer)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'white',
  pointerEvents: 'auto',
}));

interface Props {
  menu?: MenuModel;
  logo?: ImageModel;
  headerContent?: HeaderContentModel;
  announcement?: string;
}

export default function NavBarDesktop(props: Props) {
  const { menu, logo, headerContent, announcement } = props;

  const navLinks: NavLinkModel[] = [];
  menu?.menuItems.nodes.map((node) => addNavLink(navLinks, node));

  const scrollTrigger = useScrollTrigger();

  const [spring, springApi] = useSpring(() => ({
    y: '0%',
  }));

  useScroll(
    ({ xy: [, y] }) => {
      const windowHeight = window.innerHeight;
      springApi.start({
        y: scrollTrigger && y > windowHeight / 2 ? '-151px' : '0px',
      });
    },
    {
      target: typeof window !== 'undefined' ? window : undefined,
    },
  );

  // Set default state on page load
  useEffect(() => {
    springApi.start({
      y: '0%',
    });
  }, [springApi]);

  const theme = useTheme();
  const { primaryGreen, white } = theme.palette.common;

  return (
    <StyledAppBar elevation={0}>
      {announcement && (
        <Box bgcolor={primaryGreen} component="div" py={0.8} zIndex={6}>
          <ContentContainer>
            <Typography variant="body3" color={white}>
              {announcement}
            </Typography>
          </ContentContainer>
        </Box>
      )}
      <ABox component="div" bgcolor={white} style={spring}>
        <StyledContentContainer zIndex={3}>
          <AnimatedHoverZoomWrapper>
            <Link
              href={HOME_PAGE}
              style={{ display: 'flex' }}
              aria-label="CapriCare Home Page"
            >
              <Box
                component="div"
                width={{ md: 128 }}
                height={{ md: 67 }}
                position="relative"
                mt={2}
                mb={2.5}
              >
                <AnimatedImage
                  src={logo?.node.sourceUrl}
                  alt={logo?.node.altText}
                  sizes="8.8vw"
                  objectFit="contain"
                />
              </Box>
            </Link>
          </AnimatedHoverZoomWrapper>

          <Stack
            direction="row"
            justifyContent="center"
            columnGap={{ lg: 3, xl: 4, xxl: 5 }}
          >
            {navLinks.map((navLink) => (
              <NavLinkButton navLink={navLink} />
            ))}
          </Stack>
          {headerContent?.featuredLink?.url && (
            <Button
              label={headerContent.featuredLink?.title}
              href={headerContent.featuredLink?.url}
            />
          )}
        </StyledContentContainer>
      </ABox>
    </StyledAppBar>
  );
}
