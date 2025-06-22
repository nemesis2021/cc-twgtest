import {
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ArrowButton from './Buttons/ArrowButton';
import CircleButton from './Buttons/CircleButton';

interface Props {
  hasPrevious: boolean;
  hasMore: boolean;
  handleSetPage: (page: number) => void;
  page: number;
  pages: number[];
  maxPagesToRender?: number;
  fluid?: boolean;
}

export default function Pagination(props: Props) {
  const {
    hasPrevious,
    hasMore,
    handleSetPage,
    page,
    pages,
    maxPagesToRender = 6,
    fluid = false,
  } = props;

  const theme = useTheme();

  const { md } = theme.breakpoints.values;
  const isMobile = useMediaQuery(theme.breakpoints.down(md));

  const getVisiblePages = () => {
    if (pages.length <= maxPagesToRender) {
      return pages;
    }

    let startIndex = page - 3;
    if (startIndex < 0) startIndex = 0;

    const visiblePages = pages.slice(startIndex, startIndex + maxPagesToRender);

    if (visiblePages.length < maxPagesToRender && startIndex > 0) {
      const missingPages = maxPagesToRender - visiblePages.length;
      const previousPages = pages.slice(startIndex - missingPages, startIndex);
      return [...previousPages, ...visiblePages];
    }

    return visiblePages;
  };
  return (
    <Grid container justifyContent="center" pt={{ xs: 11.5, md: 10 }}>
      <Grid item xs={12} md={fluid ? 12 : 8}>
        <Stack
          direction="row"
          width="100%"
          mx="auto"
          justifyContent="space-between"
        >
          {!isMobile && (
            <ArrowButton
              arrow="left"
              buttonSize={50}
              disabled={!hasPrevious}
              onClick={() => handleSetPage(page - 1)}
            />
          )}
          <Stack direction="row" columnGap={1}>
            {getVisiblePages().map((p) => (
              <CircleButton
                active={p === page}
                onClick={() => handleSetPage(p)}
                label={p.toString()}
              >
                {p}
              </CircleButton>
            ))}
            {isMobile && pages.length > maxPagesToRender && (
              <Typography variant="button">...</Typography>
            )}
          </Stack>
          {!isMobile && (
            <ArrowButton
              buttonSize={50}
              disabled={!hasMore}
              onClick={() => handleSetPage(page + 1)}
            />
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
