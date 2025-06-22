import { Box, BoxProps, styled } from '@mui/material';
import React from 'react';

const StyledBox = styled(Box)<ContentContainerProps>(({
  theme,
  disablePadding,
}) => {
  let paddingXS = 2.5;
  let paddingMD = 2.5;
  let paddingXXL = 4;
  let paddingXXXL = 6;

  if (disablePadding) {
    paddingXS = 0;
    paddingMD = 0;
    paddingXXL = 0;
    paddingXXXL = 0;
  }

  return {
    [theme.breakpoints.up('xs')]: {
      paddingLeft: theme.spacing(paddingXS),
      paddingRight: theme.spacing(paddingMD),
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(paddingXS),
      paddingRight: theme.spacing(paddingMD),
    },
    [theme.breakpoints.up('xxl')]: {
      paddingLeft: theme.spacing(paddingXXL),
      paddingRight: theme.spacing(paddingXXL),
    },
    [theme.breakpoints.up('xxxl')]: {
      paddingLeft: theme.spacing(paddingXXXL),
      paddingRight: theme.spacing(paddingXXXL),
    },
  };
});

export interface ContentContainerProps extends BoxProps {
  disablePadding?: boolean;
  fluid?: boolean;
}

function ContentContainer(
  props: ContentContainerProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { width, fluid, ...restProps } = props;

  return (
    <StyledBox
      ref={ref}
      width={width ?? '100%'}
      maxWidth={fluid ? 'auto' : 2200}
      mx="auto"
      {...restProps}
    />
  );
}

export default React.forwardRef<HTMLDivElement, ContentContainerProps>(
  ContentContainer,
);
