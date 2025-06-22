import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Grid,
  SelectChangeEvent,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { config } from '@react-spring/web';
import { SECTIONAL_GAP } from '../../utils/styleGlobals';
import AnimatedResponsiveContainer from '../Animation/AnimatedResponsiveContainer';
import AnimationTransitionFade from '../Animation/AnimationTransitionFade';
import ClinicalStudyCard from '../Cards/ClinicalStudyCard';
import ContentContainer from '../ContentContainer';
import Select from '../Inputs/Select';
import Pagination from '../Pagination';
import AnimationExpandVertical from '../Animation/AnimationExpandVertical';
import useGetClinicalStudies from '../../utils/hooks/customPostTypes/useGetClinicalStudies';
import {
  clinicalStudyOrderChoice,
  OrderByValue,
} from '../../utils/models/OrderByModel';

const POST_PER_PAGE = 8;

export default function ClinicalStudiesWithSortSection() {
  const [isVisible, setIsVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedSortBy, setSelectedSortBy] = useState<OrderByValue>(
    OrderByValue.menuOrder,
  );

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState<number[]>([]);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const theme = useTheme();
  const { primaryGreen, strawberryRed, cementGrey } = theme.palette.common;

  const {
    data: clinicalStudiesData,
    loading,
    error,
    networkStatus,
  } = useGetClinicalStudies({
    orderBy: selectedSortBy,
    size: POST_PER_PAGE,
    offset: (page - 1) * POST_PER_PAGE,
  });

  const [clinicalStudies, setClinicalStudies] = useState(
    clinicalStudiesData?.clinicalStudies.edges.map(
      (clinicalStudy) => clinicalStudy.node,
    ) || [],
  );

  const isLoadingPage = networkStatus === 3;
  const hasNextPage =
    clinicalStudiesData?.clinicalStudies.pageInfo.offsetPagination.hasMore;
  const hasPrevPage =
    clinicalStudiesData?.clinicalStudies.pageInfo.offsetPagination.hasPrevious;

  useEffect(() => {
    if (loading && !isLoadingPage) {
      setIsVisible(false);
    }
    if (!loading) {
      setClinicalStudies(
        clinicalStudiesData?.clinicalStudies.edges.map(
          (clinicalStudy) => clinicalStudy.node,
        ) || [],
      );
      setIsVisible(true);
    }
  }, [clinicalStudiesData, loading, isLoadingPage]);

  useEffect(() => {
    if (clinicalStudiesData?.clinicalStudies.pageInfo.offsetPagination.total) {
      const totalPages: number = Math.ceil(
        clinicalStudiesData.clinicalStudies.pageInfo.offsetPagination.total /
          POST_PER_PAGE,
      );
      const newPages = Array.from(
        { length: totalPages },
        (_, index) => index + 1,
      );
      setPages(newPages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinicalStudiesData?.clinicalStudies.pageInfo.offsetPagination.total]);

  useEffect(() => {
    setPage(1);
  }, [selectedSortBy]);

  useEffect(() => {
    if (hasNextPage !== undefined) {
      setHasMore(hasNextPage);
    }
    if (hasPrevPage !== undefined) {
      setHasPrevious(hasPrevPage);
    }
  }, [hasNextPage, hasPrevPage]);

  useEffect(() => {
    if (error) {
      setErrorMessage(
        `An error occured: ${error.message}` ||
          'An error occurred while fetching blogs, please try again later.',
      );
    }
  }, [error]);

  // handler
  const handleSortChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedSortBy(event.target.value as OrderByValue);
  };
  const handleSetPage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <ContentContainer my={SECTIONAL_GAP} minHeight="60vh">
      <AnimatedResponsiveContainer>
        <AnimationTransitionFade
          config={config.stiff}
          index={isVisible ? 1 : 0}
          elements={[
            <Box
              component="div"
              display="flex"
              minHeight={350}
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress sx={{ color: primaryGreen }} />
            </Box>,
            <>
              <Stack
                direction="row"
                alignSelf="center"
                spacing={1}
                mb={2.5}
                mt={{ xs: 3, md: 0 }}
                justifyContent={{ xs: 'initial', md: 'flex-end' }}
              >
                <Typography variant="h6" color={primaryGreen}>
                  Sort by:
                </Typography>
                <Select
                  data={clinicalStudyOrderChoice}
                  value={selectedSortBy}
                  onChange={handleSortChange}
                />
              </Stack>

              <Grid container rowSpacing={5} columnSpacing={2.5}>
                {clinicalStudies && clinicalStudies.length > 0 ? (
                  clinicalStudies.map((clinicalStudy) => (
                    <Grid item xs={12} md={4} xxl={3}>
                      <ClinicalStudyCard
                        data={clinicalStudy}
                        applyToGrid
                        showReadMore
                      />
                    </Grid>
                  ))
                ) : (
                  <Grid
                    item
                    xs={12}
                    height={350}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Stack direction="column" spacing={3}>
                      <Typography variant="h6" color={cementGrey}>
                        No results found.
                      </Typography>
                    </Stack>
                  </Grid>
                )}
              </Grid>
            </>,
          ]}
        />
        <AnimationExpandVertical isExpanded={!!error}>
          <Typography pt={1} color={strawberryRed}>
            {errorMessage}
          </Typography>
        </AnimationExpandVertical>
        {clinicalStudies.length > 0 && pages.length > 1 && !error && (
          <Pagination
            handleSetPage={handleSetPage}
            hasMore={hasMore}
            hasPrevious={hasPrevious}
            page={page}
            pages={pages}
            fluid
          />
        )}
      </AnimatedResponsiveContainer>
    </ContentContainer>
  );
}
