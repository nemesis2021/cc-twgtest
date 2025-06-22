import { ChangeEvent, useEffect, useMemo, useReducer } from 'react';
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
import { CONTENT_GAP, SECTIONAL_GAP } from '../../utils/styleGlobals';
import useGetBlogs from '../../utils/hooks/customPostTypes/useGetBlogs';
import type { TaxonomyModel } from '../../utils/models/TaxonomyModel';
import type { CategoriesModel } from '../../utils/models/CategoryModel';
import type { BlogPostPartialModel } from '../../utils/models/customPostTypes/BlogPostModel';
import { orderByChoices, OrderByValue } from '../../utils/models/OrderByModel';

import Button from '../Buttons/Button';
import Select from '../Inputs/Select';
import CheckBox from '../Inputs/CheckBox';
import Accordion from '../Accordion';
import Pagination from '../Pagination';
import BlogPostCard from '../Cards/BlogPostCard';
import AnimationZoomIn from '../Animation/AnimationZoomIn';
import ContentContainer from '../ContentContainer';
import AnimationTransitionFade from '../Animation/AnimationTransitionFade';
import AnimationExpandVertical from '../Animation/AnimationExpandVertical';
import AnimatedResponsiveContainer from '../Animation/AnimatedResponsiveContainer';

const POST_PER_PAGE = 8;

interface Props {
  categories: CategoriesModel[];
}

type BlogState = {
  checkedItems: Record<string, boolean>;
  isVisible: boolean;
  selectedFilters: TaxonomyModel[];
  selectedSortBy: OrderByValue;
  page: number;
  pages: number[];
  hasPrevious: boolean;
  hasMore: boolean;
  errorMessage: string;
  blogs: BlogPostPartialModel[];
};

type BlogAction =
  | { type: 'SET_CHECKED_ITEMS'; payload: Record<string, boolean> }
  | { type: 'SET_VISIBILITY'; payload: boolean }
  | { type: 'SET_FILTERS'; payload: TaxonomyModel[] }
  | { type: 'SET_SORT_BY'; payload: OrderByValue }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_PAGES'; payload: number[] }
  | {
      type: 'SET_PAGINATION';
      payload: { hasPrevious: boolean; hasMore: boolean };
    }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_BLOGS'; payload: BlogPostPartialModel[] }
  | { type: 'RESET_FILTERS' };

function blogReducer(state: BlogState, action: BlogAction): BlogState {
  switch (action.type) {
    case 'SET_CHECKED_ITEMS':
      return { ...state, checkedItems: action.payload };
    case 'SET_VISIBILITY':
      return { ...state, isVisible: action.payload };
    case 'SET_FILTERS':
      return { ...state, selectedFilters: action.payload, page: 1 };
    case 'SET_SORT_BY':
      return { ...state, selectedSortBy: action.payload, page: 1 };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_PAGES':
      return { ...state, pages: action.payload };
    case 'SET_PAGINATION':
      return {
        ...state,
        hasPrevious: action.payload.hasPrevious,
        hasMore: action.payload.hasMore,
      };
    case 'SET_ERROR':
      return { ...state, errorMessage: action.payload };
    case 'SET_BLOGS':
      return { ...state, blogs: action.payload };
    case 'RESET_FILTERS':
      return {
        ...state,
        checkedItems: {},
        selectedFilters: [],
        selectedSortBy: OrderByValue.menuOrder,
        page: 1,
      };
    default:
      return state;
  }
}

const initialState: BlogState = {
  checkedItems: {},
  isVisible: true,
  selectedFilters: [],
  selectedSortBy: OrderByValue.menuOrder,
  page: 1,
  pages: [],
  hasPrevious: false,
  hasMore: false,
  errorMessage: '',
  blogs: [],
};

export default function BlogsWithFilterSection(props: Props) {
  const { categories } = props;

  const [state, dispatch] = useReducer(blogReducer, initialState);
  const {
    checkedItems,
    isVisible,
    selectedFilters,
    selectedSortBy,
    page,
    pages,
    hasPrevious,
    hasMore,
    errorMessage,
    blogs,
  } = state;

  const theme = useTheme();
  const { primaryGreen, strawberryRed, cementGrey } = theme.palette.common;

  const {
    data: blogsData,
    loading,
    error,
    networkStatus,
  } = useGetBlogs({
    taxArray: selectedFilters,
    orderBy: selectedSortBy,
    size: POST_PER_PAGE,
    offset: (page - 1) * POST_PER_PAGE,
  });

  const checkedCount = useMemo(
    () => Object.values(checkedItems).filter(Boolean).length,
    [checkedItems],
  );

  const isLoadingPage = networkStatus === 3;
  const hasNextPage = blogsData?.posts.pageInfo.offsetPagination.hasMore;
  const hasPrevPage = blogsData?.posts.pageInfo.offsetPagination.hasPrevious;

  useEffect(() => {
    if (loading && !isLoadingPage) {
      dispatch({ type: 'SET_VISIBILITY', payload: false });
    }
    if (!loading) {
      dispatch({
        type: 'SET_BLOGS',
        payload: blogsData?.posts.edges.map((blog) => blog.node) || [],
      });
      dispatch({ type: 'SET_VISIBILITY', payload: true });
    }
  }, [blogsData, loading, isLoadingPage]);

  useEffect(() => {
    if (blogsData?.posts.pageInfo.offsetPagination.total) {
      const totalPages: number = Math.ceil(
        blogsData.posts.pageInfo.offsetPagination.total / POST_PER_PAGE,
      );
      dispatch({
        type: 'SET_PAGES',
        payload: Array.from({ length: totalPages }, (_, index) => index + 1),
      });
    }
  }, [blogsData?.posts.pageInfo.offsetPagination.total]);

  useEffect(() => {
    if (hasNextPage !== undefined || hasPrevPage !== undefined) {
      dispatch({
        type: 'SET_PAGINATION',
        payload: {
          hasPrevious: hasPrevPage || false,
          hasMore: hasNextPage || false,
        },
      });
    }
  }, [hasNextPage, hasPrevPage]);

  useEffect(() => {
    if (error) {
      dispatch({
        type: 'SET_ERROR',
        payload:
          error.message ||
          'An error occurred while fetching blogs, please try again later.',
      });
    }
  }, [error]);

  // Handlers
  const handleSortChange = (event: SelectChangeEvent<unknown>) => {
    dispatch({
      type: 'SET_SORT_BY',
      payload: event.target.value as OrderByValue,
    });
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    dispatch({
      type: 'SET_CHECKED_ITEMS',
      payload: { ...checkedItems, [id]: checked },
    });
  };

  const handleApplyFilters = () => {
    const newFilters = Object.keys(checkedItems)
      .filter((id) => checkedItems[id])
      .map((id) => ({
        terms: id,
        taxonomy: 'CATEGORY',
      }));

    dispatch({ type: 'SET_FILTERS', payload: newFilters });
  };

  const handleClearFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const handleSetPage = (newPage: number) => {
    dispatch({ type: 'SET_PAGE', payload: newPage });
  };

  const restructuredCategories = useMemo(
    () =>
      categories.map((category) => ({
        title: category.name,
        body: category.nodes?.map((child) => (
          <CheckBox
            key={child.databaseId}
            data={{
              label: child.name,
              id: child.databaseId,
            }}
            name={`categoryId-${child.databaseId}`}
            typographyProps="body2"
            onChange={handleCheckboxChange}
            checked={!!checkedItems[child.databaseId]}
          />
        )),
      })), // eslint-disable-next-line react-hooks/exhaustive-deps
    [categories, checkedItems],
  );

  return (
    <ContentContainer my={SECTIONAL_GAP} minHeight="60vh">
      <Grid container columnSpacing={CONTENT_GAP} px={{ lg: 5 }}>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" color={primaryGreen} mb={2.5}>
            Filter by:
          </Typography>
          <Accordion
            data={restructuredCategories}
            firstItemOpen
            customColor={cementGrey}
          />
          <Stack mt={3.75} spacing={3}>
            <AnimationZoomIn>
              <Button
                label={`Apply Filter (${checkedCount})`}
                onClick={handleApplyFilters}
              />
            </AnimationZoomIn>
            {checkedCount > 0 && (
              <AnimationZoomIn>
                <Button
                  label="Clear Filter"
                  variant="primaryGreenBorder"
                  onClick={handleClearFilters}
                />
              </AnimationZoomIn>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} md={9}>
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
                    justifyContent={{ xs: 'initial', sm: 'flex-end' }}
                  >
                    <Typography variant="h6" color={primaryGreen}>
                      Sort by:
                    </Typography>
                    <Select
                      data={orderByChoices}
                      value={selectedSortBy}
                      onChange={handleSortChange}
                    />
                  </Stack>

                  <Grid container rowSpacing={5} columnSpacing={2.5}>
                    {blogs && blogs.length > 0 ? (
                      blogs.map((blog) => (
                        <Grid item xs={12} sm={6} md={4} xl={3} key={blog.id}>
                          <BlogPostCard data={blog} applyToGrid showReadMore />
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
                          <AnimationZoomIn>
                            <Button
                              label="Clear Filter"
                              variant="primaryGreenBorder"
                              onClick={handleClearFilters}
                            />
                          </AnimationZoomIn>
                        </Stack>
                      </Grid>
                    )}
                  </Grid>
                </>,
              ]}
            />
            <AnimationExpandVertical isExpanded={!!errorMessage}>
              <Typography pt={1} color={strawberryRed}>
                {errorMessage}
              </Typography>
            </AnimationExpandVertical>
            {blogs.length > 0 && pages.length > 1 && !errorMessage && (
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
        </Grid>
      </Grid>
    </ContentContainer>
  );
}
