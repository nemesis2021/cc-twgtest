import {
  Typography,
  styled,
  useTheme,
  useMediaQuery,
  Stack,
} from '@mui/material';
import Link from 'next/link';
import { Button as ButtonUnstyled, ButtonProps } from '@mui/base';
import { animated, useSpring } from '@react-spring/web';
import useGetHoverState from '../../utils/hooks/useGetHoverState';
import type { NavLinkModel } from '../../utils/models/NavLinkModel';
import Chevron from '../../assets/icons/chevron.svg';
import DropdownMenu from '../Navigation/DropdownMenu';

const AnimatedChevron = animated(Chevron);

const StyledButton = styled(animated(ButtonUnstyled))(({ theme }) => ({
  color: theme.palette.common.black,
  pointerEvents: 'auto',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  width: 'max-content',
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
}));

interface Props extends ButtonProps {
  navLink: NavLinkModel;
}

export default function NavLinkButton(props: Props) {
  const { navLink, ...restProps } = props;
  const { label, href, children } = navLink;

  const { isHovering, hoverBind } = useGetHoverState();

  const theme = useTheme();
  const { primaryGreen } = theme.palette.common;
  const isTablet = useMediaQuery(theme.breakpoints.up('md'));

  const chevronSpring = useSpring({
    transform: isHovering ? 'rotate(-180deg)' : 'rotate(0deg)',
  });

  const spring = useSpring({
    scale: isHovering && isTablet ? 0.9 : 1,
    y: isHovering && isTablet ? 2 : 0,
  });

  return (
    <StyledButton
      {...hoverBind()}
      {...restProps}
      style={spring}
      aria-label={label}
    >
      <Stack
        direction="row"
        position="relative"
        alignItems="center"
        spacing={1}
        color={primaryGreen}
      >
        {href && (
          <Link href={href} aria-label={label}>
            <Typography variant="button" py={3}>
              {label}
            </Typography>
          </Link>
        )}
        {!href && <Typography variant="button">{label}</Typography>}
        {children.length > 0 && (
          <>
            <AnimatedChevron width={14} height={9} style={chevronSpring} />
            <DropdownMenu
              navlinks={children}
              open={isHovering}
              top="24px"
              left="-20px"
            />
          </>
        )}
      </Stack>
    </StyledButton>
  );
}
