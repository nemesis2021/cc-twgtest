import {
  Stack,
  StackProps,
  styled,
  Typography,
  TypographyProps,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HOME_PAGE } from '../utils/routes';

const StyledTypography = styled(Typography, {
  shouldForwardProp: (propName) => propName !== 'colorVariant',
})<TypographyProps>(({ theme }) => ({
  cursor: 'pointer',
  textTransform: 'capitalize',
  transition: 'color 0.3s',
  '&:hover': {
    color: theme.palette.common.primaryGreen,
  },
}));

const removeFirstElem = (list: any[]) => list.splice(0, 1);

interface Props {
  displayHome?: boolean;

  currentPageTitle?: string;
}

export default function BreadCrumbs(props: StackProps & Props) {
  const { displayHome = false, currentPageTitle } = props;
  const router = useRouter();
  const { asPath } = router;
  const theme = useTheme();
  const { primaryGreen } = theme.palette.common;

  const paths = [];
  const names = asPath.split('/').map((s) => {
    let name = s;
    if (s.includes('#')) {
      name = s.slice(0, s.indexOf('#'));
    }
    return name.replaceAll('-', ' ');
  });

  for (let i = 0; i < asPath.length; i++) {
    const char = asPath[i];
    if (char === '/') {
      paths.push(asPath.slice(0, i));
    }
  }

  paths.push(
    asPath.slice(0, asPath.includes('#') ? asPath.length : asPath.indexOf('#')),
  );

  if (displayHome) {
    names[0] = 'Home';
    paths[0] = HOME_PAGE;
  } else {
    removeFirstElem(paths);
    removeFirstElem(names);
  }

  return (
    <Stack
      direction="row"
      alignItems="baseline"
      flexWrap="wrap"
      color={primaryGreen}
      mb={-3}
      {...props}
    >
      {paths.map((path, i) => (
        <>
          {i === paths.length - 1 && currentPageTitle ? (
            <Typography variant="label">{currentPageTitle}</Typography>
          ) : (
            <Link href={path} aria-label={names[i]}>
              <StyledTypography variant="label">{names[i]}</StyledTypography>
            </Link>
          )}
          {i < paths.length - 1 && (
            <Typography variant="label" lineHeight="normal">
              &nbsp;/&nbsp;
            </Typography>
          )}
        </>
      ))}
    </Stack>
  );
}
