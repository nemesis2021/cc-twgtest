import { Box, Stack, styled } from '@mui/material';
import {
  TabContentBlockTypeEnum,
  TabContentBlockTypes,
} from '../../utils/models/sections/TabContentSectionModel';
import AnimatedDivider from '../AnimatedDivider';
import Button from '../Buttons/Button';

interface StyledTypographyProps {
  bodyVariant?: 'body1' | 'body2' | 'body3';
  isTwoColumn?: boolean;
}

const StyledTpography = styled(Box)<StyledTypographyProps>(
  ({ theme, bodyVariant = 'body1', isTwoColumn = false }) => ({
    color: theme.palette.common.cementGrey,
    ...theme.typography[bodyVariant],

    '& img': {
      marginBottom: theme.spacing(3.75),
      ...(isTwoColumn
        ? {
            width: '100%',
            height: '100%',
          }
        : {
            [theme.breakpoints.down('lg')]: {
              width: '100%',
              height: '100%',
            },
          }),
    },

    '& h2': {
      ...theme.typography.h2,
      color: theme.palette.common.primaryGreen,
      margin: 0,
      marginBottom: 16,
    },

    '& h3': {
      margin: 0,
      marginBottom: 16,
      ...theme.typography.h3,
    },

    '& h5': {
      ...theme.typography.h5,
      color: theme.palette.common.greenTeaGreen,
      marginBottom: 16,
    },

    '& p': {
      margin: 0,
      marginBottom: 3,
    },

    '& ol, & ul': {
      paddingLeft: theme.spacing(3),
    },
  }),
);

interface Props {
  data: TabContentBlockTypes;
}

export default function TabContent(props: Props) {
  const { data } = props;
  const { __typename } = data;

  if (__typename === TabContentBlockTypeEnum.TwoColumnBlock) {
    const { leftColumn, rightColumn } = data;

    return (
      <Stack direction={{ xs: 'column', md: 'row' }} columnGap={6.25}>
        <Box component="div" flexBasis={{ xs: '100%', md: '50%' }}>
          <StyledTpography
            component="div"
            isTwoColumn
            dangerouslySetInnerHTML={{ __html: leftColumn.body }}
          />
        </Box>
        <Box component="div" flexBasis={{ xs: '100%', md: '50%' }}>
          <StyledTpography
            component="div"
            isTwoColumn
            dangerouslySetInnerHTML={{ __html: rightColumn.body }}
          />
        </Box>
      </Stack>
    );
  }

  if (__typename === TabContentBlockTypeEnum.TextContentBlock) {
    const { body, topDivider = false } = data;

    return (
      <>
        {topDivider && <AnimatedDivider />}
        <StyledTpography
          component="div"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </>
    );
  }

  if (__typename === TabContentBlockTypeEnum.ReferencesBlock) {
    const { body } = data;

    return (
      <>
        <AnimatedDivider />
        <StyledTpography
          component="div"
          bodyVariant="body3"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </>
    );
  }

  if (__typename === TabContentBlockTypeEnum.LinkGroupBlock) {
    const { links } = data;

    return (
      <Stack direction="row" gap={2.5} flexWrap="wrap">
        {links &&
          links.length > 0 &&
          links.map(({ link }) => (
            <Button label={link.title} href={link.url} target={link.target} />
          ))}
      </Stack>
    );
  }

  return null;
}
