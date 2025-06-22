import { Button as ButtonUnstyled, ButtonProps } from '@mui/base';
import { CSSProperties, HTMLAttributeAnchorTarget } from 'react';
import {
  alpha,
  CircularProgress,
  darken,
  styled,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import useGetHoverState from '../../utils/hooks/useGetHoverState';
import { ColorTheme } from '../../utils/models/ColorTheme';
import getPathFromCmsUrl from '../../utils/getPathFromCmsUrl';

const AnimatedTypography = animated(Typography);

interface VariantStyle {
  labelColor: string;
  bgColor: string;
  hoverLabelColor: string;
  hoverBgColor: string;
  borderColor: string;
}

const buttonStyles = (theme: Theme): Record<ColorTheme, VariantStyle> => ({
  primaryGreen: {
    labelColor: theme.palette.common.white,
    bgColor: theme.palette.common.primaryGreen,
    hoverLabelColor: theme.palette.common.white,
    hoverBgColor: darken(theme.palette.common.primaryGreen, 0.1),
    borderColor: theme.palette.common.primaryGreen,
  },
  strawberryRed: {
    labelColor: theme.palette.common.white,
    bgColor: theme.palette.common.strawberryRed,
    hoverLabelColor: theme.palette.common.white,
    hoverBgColor: darken(theme.palette.common.strawberryRed, 0.1),
    borderColor: theme.palette.common.strawberryRed,
  },
  skyBlue: {
    labelColor: theme.palette.common.white,
    bgColor: theme.palette.common.skyBlue,
    hoverLabelColor: theme.palette.common.white,
    hoverBgColor: darken(theme.palette.common.skyBlue, 0.1),
    borderColor: theme.palette.common.skyBlue,
  },
  mustardYellow: {
    labelColor: theme.palette.common.white,
    bgColor: theme.palette.common.mustardYellow,
    hoverLabelColor: theme.palette.common.white,
    hoverBgColor: darken(theme.palette.common.mustardYellow, 0.1),
    borderColor: theme.palette.common.mustardYellow,
  },
  primaryGreenBorder: {
    labelColor: theme.palette.common.primaryGreen,
    bgColor: alpha(theme.palette.common.primaryGreen, 0),
    hoverLabelColor: theme.palette.common.white,
    hoverBgColor: theme.palette.common.primaryGreen,
    borderColor: theme.palette.common.primaryGreen,
  },
  strawberryRedBorder: {
    labelColor: theme.palette.common.strawberryRed,
    bgColor: alpha(theme.palette.common.strawberryRed, 0),
    hoverLabelColor: theme.palette.common.white,
    hoverBgColor: theme.palette.common.strawberryRed,
    borderColor: theme.palette.common.strawberryRed,
  },
  skyBlueBorder: {
    labelColor: theme.palette.common.skyBlue,
    bgColor: alpha(theme.palette.common.skyBlue, 0),
    hoverLabelColor: theme.palette.common.white,
    hoverBgColor: theme.palette.common.skyBlue,
    borderColor: theme.palette.common.skyBlue,
  },
  mustardYellowBorder: {
    labelColor: theme.palette.common.mustardYellow,
    bgColor: alpha(theme.palette.common.mustardYellow, 0),
    hoverLabelColor: theme.palette.common.white,
    hoverBgColor: theme.palette.common.mustardYellow,
    borderColor: theme.palette.common.mustardYellow,
  },
});

const AnimatedButton = styled(
  animated(ButtonUnstyled),
  {},
)(({ theme }) => ({
  display: 'inline-flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  borderRadius: 100,
  position: 'relative',
  overflow: 'hidden',
  zIndex: 0,
  minWidth: 180,
  padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  [theme.breakpoints.up('xl')]: {
    padding: `${theme.spacing(2.2)} ${theme.spacing(5)}`,
  },
  [theme.breakpoints.up('xxl')]: {
    padding: `${theme.spacing(2.3)} ${theme.spacing(6)}`,
  },
}));

interface Props extends ButtonProps {
  variant?: ColorTheme;
  label: string;
  selected?: boolean;
  onClick?: () => void;
  href?: string;
  loading?: boolean;
  target?: string;
  width?: CSSProperties['width'];
  linkTarget?: HTMLAttributeAnchorTarget;
}

export default function Button(props: Props) {
  const {
    label,
    onClick,
    selected,
    href,
    loading,
    target,
    linkTarget,
    width = 'fit-content',
    variant = 'primaryGreen',
    disabled,
    style,
    ...restProps
  } = props;

  const { isHovering, hoverBind } = useGetHoverState();

  const theme = useTheme();
  const styles = buttonStyles(theme);
  const currentStyles = styles[variant];

  const toggle = (isHovering || selected) && !loading && !disabled;

  const buttonSpring = useSpring({
    backgroundColor: toggle
      ? currentStyles.hoverBgColor
      : currentStyles.bgColor,
    color: toggle ? currentStyles.hoverLabelColor : currentStyles.labelColor,
    border: `1px solid ${
      toggle ? currentStyles.hoverBgColor : currentStyles.borderColor
    }`,
    scale: isHovering && !loading && !disabled ? 0.9 : 1,
    opacity: disabled ? 0.7 : 1,
  });

  const textSpring = useSpring({
    color: 'inherit',
    opacity: loading ? 0 : 1,
  });

  const button = (
    <AnimatedButton
      {...hoverBind()}
      onClick={onClick}
      target={target}
      disabled={loading || disabled}
      aria-label={label}
      style={{
        cursor: disabled || loading ? 'default' : 'pointer',
        width,
        ...buttonSpring,
        ...style,
      }}
      {...restProps}
    >
      {loading && (
        <CircularProgress
          size={20}
          thickness={2}
          sx={{ position: 'absolute', color: 'inherit', zIndex: 2 }}
        />
      )}
      <AnimatedTypography
        variant="button"
        style={textSpring}
        textTransform="none"
      >
        {label}
      </AnimatedTypography>
    </AnimatedButton>
  );

  if (href) {
    return (
      <Link
        href={getPathFromCmsUrl(href)}
        aria-label={label}
        style={{ width }}
        target={linkTarget}
      >
        {button}
      </Link>
    );
  }

  return button;
}
