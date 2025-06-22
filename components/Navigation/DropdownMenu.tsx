import Link from 'next/link';
import { Box, BoxProps, Stack, Typography, alpha, styled } from '@mui/material';
import { animated, useSpring, useTransition } from '@react-spring/web';
import getPathFromCmsUrl from '../../utils/getPathFromCmsUrl';
import useGetHoverState from '../../utils/hooks/useGetHoverState';
import { NavLinkModel } from '../../utils/models/NavLinkModel';

const ABox = animated(Box);
const AnimatedTypography = animated(Typography);

const StyledStack = styled(Stack)(({ theme }) => ({
  position: 'relative',
  zIndex: 9989,
  borderRadius: '8px',
  border: `1px solid ${alpha(theme.palette.common.white, 0.8)}`,
  transformOrigin: 'top center',
  background: theme.palette.common.white,
  boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.06)',

  '& button': {
    padding: `${theme.spacing(0.75)} ${theme.spacing(2)}`,
  },
  '& button:first-of-type': {
    paddingTop: theme.spacing(2),
  },
  '& button:last-of-type': {
    paddingBottom: theme.spacing(2),
  },
}));

interface ChildLinkProps {
  link: NavLinkModel;
}

function ChildLink(props: ChildLinkProps) {
  const { link } = props;

  const { isHovering, hoverBind } = useGetHoverState();

  const spring = useSpring({
    scale: isHovering ? 0.9 : 1,
  });

  return (
    <Link
      aria-label={link.label}
      href={link.href ? getPathFromCmsUrl(link.href) : '#'}
      scroll={false}
      {...hoverBind()}
    >
      <ABox component="div" py={2.5} style={spring} textAlign="left">
        <AnimatedTypography variant="button">{link.label}</AnimatedTypography>
      </ABox>
    </Link>
  );
}

interface Props extends BoxProps {
  navlinks: NavLinkModel[];
  open: boolean;
}

function DropdownMenu(props: Props) {
  const { navlinks, open, ...restProps } = props;

  const transition = useTransition(open, {
    from: { opacity: 0, transform: 'scale(0.8)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.8)' },
  });

  return transition(
    (style, item) =>
      item && (
        <ABox
          position="absolute"
          margin="auto"
          width="max-content"
          minWidth="224px"
          pt={2}
          zIndex={9989}
          style={style}
          {...restProps}
        >
          <StyledStack px={2} py={1.25}>
            {navlinks.map((link) => (
              <ChildLink key={link.id} link={link} />
            ))}
          </StyledStack>
        </ABox>
      ),
  );
}

export default DropdownMenu;
