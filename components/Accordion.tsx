import React, { useMemo, useState } from 'react';
import {
  Stack,
  Typography,
  Box,
  styled,
  Button as MuiButton,
  SvgIcon,
  BoxProps,
  useTheme,
  TypographyTypeMap,
} from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { animated, useSpring } from '@react-spring/web';
import ExpandIcon from '../assets/icons/Plus.svg';
import ShrinkIcon from '../assets/icons/Minus.svg';
import WysiwygStyledTypography from './WysiwygStyledTypography';
import AnimatedDivider from './AnimatedDivider';
import useGetHoverState from '../utils/hooks/useGetHoverState';
import useResizeObserver from '../utils/hooks/useResizeObserver';
import AnimationZoomIn from './Animation/AnimationZoomIn';

const ATypography = animated(Typography);

interface AccordionItemModel {
  title: string;
  body?: React.ReactNode;
}

const AnimatedBox = animated(Box);

const AnimatedIcon = styled(animated(SvgIcon))(({ theme }) => ({
  position: 'absolute',
  right: 0,
  height: '14px',
  width: '14px',
  color: theme.palette.common.primaryGreen,
}));

const StyledButton = styled(animated(MuiButton))(({ theme }) => ({
  justifyContent: 'space-between',
  alignItems: 'center',
  color: theme.palette.common.primaryGreen,
  textAlign: 'left',
  textTransform: 'none',
  cursor: 'pointer',
  padding: 0,

  [theme.breakpoints.up('xs')]: {
    paddingBottom: 20,
    paddingTop: 20,
  },

  [theme.breakpoints.up('md')]: {
    paddingBottom: 30,
    paddingTop: 30,
  },
  border: 'none',
  ':hover': {
    backgroundColor: 'transparent',
  },
}));

interface AccordionItemProps {
  item: AccordionItemModel;
  variant: 'dark' | 'light';
  titleVariant?: TypographyTypeMap['props']['variant'];
  customColor?: string;
  expanded: boolean;
  onClick?: () => void;
}

function AccordionItem(props: AccordionItemProps) {
  const { item, expanded, onClick, variant, customColor, titleVariant } = props;
  const { title, body } = item;
  const theme = useTheme();
  const { primaryGreen, cementGrey, greenTeaGreen } = theme.palette.common;

  const { isHovering, hoverBind } = useGetHoverState();

  const { ref, clientHeight } = useResizeObserver();

  const expandSpring = useSpring({
    height: expanded ? `${clientHeight}px` : '0px',
  });

  const expandIconSpring = useSpring({
    x: isHovering ? -12 : 0,
    color: variant === 'light' ? primaryGreen : cementGrey,
    rotate: expanded ? '90deg' : '0deg',
    opacity: expanded ? 0 : 1,
  });

  const shrinkIconSpring = useSpring({
    color: variant === 'light' ? primaryGreen : cementGrey,
    x: isHovering ? -12 : 0,
    rotate: expanded ? '0deg' : '-90deg',
  });

  const titleSpring = useSpring({
    color:
      isHovering && customColor === cementGrey ? primaryGreen : customColor,
    x: isHovering ? 10 : 0,
    scale: isHovering ? 1.02 : 1,
  });

  const contentSpring = useSpring({
    y: expanded ? '-30px' : '0px',
    opacity: expanded ? 1 : 0,
  });

  const color = useMemo(() => {
    if (customColor) {
      return customColor;
    }

    return variant === 'light' ? primaryGreen : cementGrey;
  }, [variant, customColor, primaryGreen, cementGrey]);

  return (
    <>
      <Stack overflow="hidden">
        <StyledButton disableRipple onClick={onClick} {...hoverBind()}>
          <ATypography
            style={titleSpring}
            color={color}
            variant={titleVariant || 'h6'}
            flexGrow={1}
            pr={{ xs: 5, md: 10 }}
          >
            {title}
          </ATypography>
          <AnimatedIcon style={expandIconSpring}>
            <ExpandIcon
              {...(customColor && { style: { color: customColor } })}
            />
          </AnimatedIcon>
          <AnimatedIcon style={shrinkIconSpring}>
            <ShrinkIcon
              {...(customColor && { style: { color: customColor } })}
            />
          </AnimatedIcon>
        </StyledButton>
        <AnimatedBox style={expandSpring}>
          <Box ref={ref} component="div">
            <animated.div style={contentSpring}>
              {typeof body === 'string' ? (
                <WysiwygStyledTypography
                  pr={{ xs: 3, md: 4 }}
                  pt={1.8}
                  color={cementGrey}
                  text={body}
                />
              ) : (
                <Box
                  pr={{ xs: 3, md: 4 }}
                  pt={1.8}
                  color={cementGrey}
                  component="div"
                >
                  {body}
                </Box>
              )}
            </animated.div>
          </Box>
        </AnimatedBox>
      </Stack>
      <AnimatedDivider
        color={variant === 'light' ? undefined : greenTeaGreen}
      />
    </>
  );
}

interface AccordionProps extends BoxProps {
  data: AccordionItemModel[];
  variant?: 'dark' | 'light';
  customColor?: string;
  titleVariant?: TypographyTypeMap['props']['variant'];
  firstItemOpen?: boolean;
  exclusiveExpand?: boolean; // only expand one item
}

export default function Accordion(props: AccordionProps) {
  const {
    data,
    variant = 'light',
    titleVariant,
    firstItemOpen,
    customColor,
    exclusiveExpand = false,
    ...restProps
  } = props;

  const theme = useTheme();
  const { greenTeaGreen } = theme.palette.common;

  const [expandedIndices, setExpandedIndices] = useState<number[]>(
    firstItemOpen ? [0] : [],
  );

  const handleClick = (index: number) => {
    setExpandedIndices((prev) => {
      if (exclusiveExpand) {
        return prev.includes(index) ? [] : [index];
      }
      return prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index];
    });
  };

  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Box {...restProps} component="div" ref={sectionRef}>
      <AnimatedDivider
        color={variant === 'light' ? undefined : greenTeaGreen}
      />
      {data.map((item, i) => (
        <AnimationZoomIn
          shouldAnimate={sectionInView}
          delay={i * 100}
          scaleStart={0.8}
        >
          <AccordionItem
            variant={variant}
            titleVariant={titleVariant}
            item={item}
            expanded={expandedIndices.includes(i)}
            onClick={() => handleClick(i)}
            customColor={customColor}
          />
        </AnimationZoomIn>
      ))}
    </Box>
  );
}
