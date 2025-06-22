import {
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import useResizeObserverCallback from '../../../utils/hooks/useResizeObserverCallback';
import type { HeaderSectionModel } from '../../../utils/models/pages/HomePageModel';
import ContentContainer from '../../ContentContainer';
import Button from '../../Buttons/Button';
import {
  NAV_HEIGHT_MD,
  NAV_HEIGHT_XS,
  SECTIONAL_GAP_LG,
} from '../../../utils/styleGlobals';

interface Props {
  data: HeaderSectionModel;
  onHeight: (v: number) => void;
}

export default function HeaderSection(props: Props) {
  const { data, onHeight } = props;
  const { heading, description, link1, link2 } = data;

  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));
  const { primaryGreen, cementGrey } = theme.palette.common;

  const { ref: containerRef } = useResizeObserverCallback({ onHeight });

  return (
    <ContentContainer
      ref={containerRef}
      minHeight={{ xs: 'auto', md: '100vh' }}
      pt={{
        xs: NAV_HEIGHT_XS + 3,
        md: NAV_HEIGHT_MD + 1,
      }}
      pb={{ lg: SECTIONAL_GAP_LG }}
      textAlign={{ xs: 'center', md: 'left' }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Grid container px={{ lg: 5, xl: 6, xxl: 7, xxxl: 7 }}>
        <Grid item xs={12} md={7} lg={6}>
          <Typography
            variant="h1"
            color={primaryGreen}
            pb={{ xs: 2.5, md: 3.7 }}
            maxWidth={{ lg: 785, xxl: 800, xxxl: 800 }}
          >
            {heading}
          </Typography>

          <Typography
            color={cementGrey}
            dangerouslySetInnerHTML={{ __html: description }}
            pb={{ xs: 3.75, md: 6.25 }}
            maxWidth={{ lg: 691, xxl: 700, xxxl: 800 }}
          />

          <Stack
            direction="row"
            columnGap={2.5}
            justifyContent={{ xs: 'center', md: 'flex-start' }}
          >
            <Button
              label={link1.title}
              href={link1.url}
              variant="primaryGreen"
            />
            {isTablet && (
              <Button
                label={link2.title}
                href={link2.url}
                variant="primaryGreenBorder"
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </ContentContainer>
  );
}
