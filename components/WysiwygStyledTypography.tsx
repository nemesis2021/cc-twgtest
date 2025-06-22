import { Box, BoxProps, styled, TypographyTypeMap } from '@mui/material';
import parse from 'html-react-parser';

interface StyledTypographyProps {
  typographyVariant: TypographyTypeMap['props']['variant'];
}

const StyledTypography = styled(Box, {
  shouldForwardProp: (propName) => propName !== 'typographyVariant',
})<StyledTypographyProps>(({ theme, typographyVariant }) => ({
  '& h1': {
    ...theme.typography.h1,
  },
  '& h2': {
    ...theme.typography.h2,
    marginBottom: 30,
    color: theme.palette.common.primaryGreen,
  },
  '& h3': {
    ...theme.typography.h3,
    marginBottom: 30,
  },
  '& h4': {
    ...theme.typography.h4,
    marginBottom: 30,
  },
  '& h5': {
    ...theme.typography.h5,
    marginBottom: 30,
  },
  '& h6': {
    ...theme.typography.h6,
    marginBottom: 30,
  },

  ...theme.typography[
    `${
      typographyVariant === undefined || typographyVariant === 'inherit'
        ? 'body2'
        : typographyVariant
    }`
  ],
  '& p': {
    marginTop: 0,
    marginBottom: 5,
  },
  '& p:last-child': {
    marginBottom: 0,
  },
  '& a': {
    fontWeight: 'bold',
    borderBottom: '1px solid',
    borderBottomColor: 'inherit',
    ':hover': {
      borderBottomColor: theme.palette.common.primaryGreen,
      textDecorationThickness: 3,
      color: theme.palette.common.primaryGreen,
    },
  },
  color: theme.palette.common.cementGrey,
  userSelect: 'none',
}));

interface Props extends BoxProps {
  text: string;
  typographyVariant?: TypographyTypeMap['props']['variant'];
}

export default function WysiwygStyledTypography(props: Props) {
  const { text, typographyVariant = 'body1', ...restProps } = props;

  return (
    <StyledTypography typographyVariant={typographyVariant} {...restProps}>
      {parse(text ?? '')}
    </StyledTypography>
  );
}
