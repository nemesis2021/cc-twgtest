import React from 'react';
import {
  alpha,
  CircularProgress,
  darken,
  IconButton,
  IconButtonProps,
  styled,
  Theme,
  useTheme,
} from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import Arrow from '../../assets/icons/arrow.svg';
import useGetHoverState from '../../utils/hooks/useGetHoverState';
import { ColorTheme } from '../../utils/models/ColorTheme';

const AnimatedCircularProgress = styled(animated(CircularProgress))(() => ({
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  margin: 'auto',
}));

type ArrowDirections = 'right' | 'left';

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
    hoverBgColor: alpha(theme.palette.common.primaryGreen, 0),
    borderColor: theme.palette.common.primaryGreen,
  },
  strawberryRedBorder: {
    labelColor: theme.palette.common.strawberryRed,
    bgColor: alpha(theme.palette.common.strawberryRed, 0),
    hoverLabelColor: theme.palette.common.white,
    hoverBgColor: alpha(theme.palette.common.strawberryRed, 0),
    borderColor: theme.palette.common.strawberryRed,
  },
  skyBlueBorder: {
    labelColor: theme.palette.common.skyBlue,
    bgColor: alpha(theme.palette.common.skyBlue, 0),
    hoverLabelColor: theme.palette.common.white,
    hoverBgColor: alpha(theme.palette.common.skyBlue, 0),
    borderColor: theme.palette.common.skyBlue,
  },
  mustardYellowBorder: {
    labelColor: theme.palette.common.mustardYellow,
    bgColor: alpha(theme.palette.common.mustardYellow, 0),
    hoverLabelColor: theme.palette.common.white,
    hoverBgColor: alpha(theme.palette.common.mustardYellow, 0),
    borderColor: theme.palette.common.mustardYellow,
  },
});

const AnimatedButton = styled(animated(IconButton))<{ buttonSize: number }>(
  ({ buttonSize }) => ({
    position: 'relative',
    width: `${buttonSize}px`,
    height: `${buttonSize}px`,
    overflow: 'hidden',
    padding: 0,
    borderRadius: '100%',
  }),
);

const ArrowWrapper = styled(animated.div)<{ buttonSize: number }>(
  ({ buttonSize }) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: `${(buttonSize - 2) / 2}px ${(buttonSize - 2) / 4}px`,
    gap: `${(buttonSize - 2) / 2}px`,
  }),
);

interface Props extends IconButtonProps {
  onClick?: () => void;
  arrow?: ArrowDirections;
  variant?: ColorTheme;
  loading?: boolean;
  containerHover?: boolean;
  buttonSize?: number;
}

export default function ArrowButton(props: Props) {
  const {
    disabled,
    buttonSize = 50,
    arrow = 'right',
    variant = 'primaryGreen',
    loading = false,
    containerHover = false,
    style,
    ...restProps
  } = props;

  const arrowTransform = arrow === 'left' ? 'rotate(180deg)' : undefined;

  const theme = useTheme();

  const styles = buttonStyles(theme);
  const currentStyles = styles[variant];

  const { isHovering, hoverBind } = useGetHoverState();
  const toggle = isHovering && !loading && !disabled;

  const buttonSpring = useSpring({
    scale: isHovering && !loading && !disabled ? 0.9 : 1,
    backgroundColor: toggle
      ? currentStyles.hoverBgColor
      : currentStyles.bgColor,
    opacity: disabled ? 0.4 : 1,
    border: `1px solid ${
      toggle ? alpha(currentStyles.borderColor, 0.9) : currentStyles.borderColor
    }`,
  });

  const arrowWrapperSpring = useSpring({
    transform:
      (isHovering || containerHover) && !disabled
        ? 'translateX(50%)'
        : 'translateX(0%)',
  });

  const button = (
    <AnimatedButton
      {...restProps}
      {...hoverBind()}
      aria-label={`Arrow ${arrow} Button`}
      style={{
        cursor: disabled || loading ? 'default' : 'pointer',
        transform: arrowTransform,
        ...buttonSpring,
        ...style,
      }}
      buttonSize={buttonSize}
      disabled={disabled}
    >
      {!loading && (
        <ArrowWrapper style={arrowWrapperSpring} buttonSize={buttonSize}>
          <Arrow
            width={`${buttonSize / 2}px`}
            height={`${buttonSize / 2}px`}
            color={currentStyles.labelColor}
          />
          <Arrow
            width={`${buttonSize / 2}px`}
            height={`${buttonSize / 2}px`}
            color={currentStyles.labelColor}
          />
        </ArrowWrapper>
      )}
      {loading && (
        <AnimatedCircularProgress
          size={25}
          thickness={2}
          style={{ color: currentStyles.labelColor }}
        />
      )}
    </AnimatedButton>
  );

  return button;
}
