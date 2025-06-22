import {
  AppBar,
  Box,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  animated,
  useIsomorphicLayoutEffect,
  useSpring,
} from '@react-spring/web';
import Link from 'next/link';
import { CONTENT_GAP } from '../../utils/styleGlobals';
import addNavLink from '../../utils/addNavLink';
import type { MenuModel } from '../../utils/models/MenuModel';
import type { ImageModel } from '../../utils/models/ImageModel';
import type { NavLinkModel } from '../../utils/models/NavLinkModel';
import type { HeaderContentModel } from '../../utils/models/NavigationModel';
import { HOME_PAGE } from '../../utils/routes';
import ContentContainer from '../ContentContainer';
import Button from '../Buttons/Button';
import AnimatedDivider from '../AnimatedDivider';
import AnimationFade from '../Animation/AnimationFade';
import AnimatedImage from '../AnimatedImage';
import BurgerIcon from './BurgerIcon';

const ABox = animated(Box);

const StyledAppBar = styled(animated(AppBar))(({ theme }) => ({
  color: 'unset',
  backgroundColor: theme.palette.common.white,
}));

interface MobileFullWidthMenuItemProps {
  navLink: NavLinkModel;
}

function MenuItem(props: MobileFullWidthMenuItemProps) {
  const { navLink } = props;

  const theme = useTheme();
  const { cementGrey } = theme.palette.common;

  return (
    <>
      <Link
        href={navLink.href}
        style={{ width: '100%' }}
        aria-label={navLink.label}
      >
        <Box component="div" py={CONTENT_GAP}>
          <Typography variant="button" color={cementGrey}>
            {navLink.label}
          </Typography>
        </Box>
      </Link>
      {navLink.children.length > 0 && (
        <Stack mb={3}>
          {navLink.children?.map((navLinkChild) => (
            <Link
              href={navLinkChild.href}
              style={{ width: '100%', padding: 8 }}
              aria-label={navLinkChild.label}
              key={navLinkChild.id}
            >
              <Typography variant="button" color={cementGrey} ml={1.875}>
                {navLinkChild.label}
              </Typography>
            </Link>
          ))}
        </Stack>
      )}
    </>
  );
}

interface MobileFullWidthMenuProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  menu?: MenuModel;
  headerContent?: HeaderContentModel;
}

function MobileFullWidthMenu(props: MobileFullWidthMenuProps) {
  const { open, menu, setOpen, headerContent } = props;
  const router = useRouter();

  const navLinks: NavLinkModel[] = [];
  menu?.menuItems.nodes.map((node) => addNavLink(navLinks, node));

  const theme = useTheme();
  const { white } = theme.palette.common;

  const heightSpring = useSpring({
    opacity: open ? 1 : 0,
    height: open ? '100dvh' : '0dvh',
  });

  useIsomorphicLayoutEffect(() => {
    if (open && typeof window !== 'undefined') {
      window.document.body.style.overflow = 'hidden';
      return;
    }

    window.document.body.style.overflow = 'auto';
  }, [open]);

  useEffect(() => {
    const onRouteChangeStart = () => {
      setOpen(false);
    };

    router.events.on('routeChangeStart', onRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
    };
  }, [router.events, setOpen]);

  return (
    <ABox
      component="div"
      position="fixed"
      top={0}
      width="100%"
      zIndex={2}
      overflow="hidden"
      style={heightSpring}
      pt={12}
      bgcolor={white}
    >
      <ContentContainer height="100%" maxHeight="max-content" overflow="auto">
        <AnimationFade visible={open}>
          <Stack
            divider={<AnimatedDivider borderColor={theme.palette.divider} />}
          >
            {navLinks.map((navLink) => (
              <MenuItem navLink={navLink} key={navLink.id} />
            ))}
          </Stack>
          <AnimatedDivider borderColor={theme.palette.divider} mb={6} />
          {headerContent && headerContent?.featuredLink?.url && (
            <Box component="div" pb={4}>
              <Button
                label={headerContent.featuredLink?.title}
                href={headerContent.featuredLink?.url}
              />
            </Box>
          )}
        </AnimationFade>
      </ContentContainer>
    </ABox>
  );
}

interface Props {
  menu?: MenuModel;
  logo?: ImageModel;
  headerContent?: HeaderContentModel;
  announcement?: string;
}

export default function NavBarMobile(props: Props) {
  const { menu, logo, headerContent, announcement } = props;
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const { primaryGreen, white } = theme.palette.common;

  return (
    <>
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
        <ContentContainer component="div" zIndex={3} position="relative">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            height={70}
          >
            {logo && (
              <Link
                href={HOME_PAGE}
                style={{ lineHeight: 0 }}
                aria-label="Capricare Logo"
              >
                <Box width={94} height={49} position="relative" component="div">
                  <AnimatedImage
                    src={logo?.node.sourceUrl}
                    alt={logo?.node.altText}
                    sizes="25vw"
                    objectFit="contain"
                  />
                </Box>
              </Link>
            )}
            <BurgerIcon open={open} setOpen={setOpen} />
          </Stack>
        </ContentContainer>
      </StyledAppBar>
      <MobileFullWidthMenu
        open={open}
        menu={menu}
        setOpen={setOpen}
        headerContent={headerContent}
      />
    </>
  );
}
