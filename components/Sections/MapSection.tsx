import { alpha, Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import ContentContainer from '../ContentContainer';
import {
  BORDER_RADIUS,
  CONTENT_GAP,
  SECTIONAL_GAP,
} from '../../utils/styleGlobals';
import TextInput from '../Inputs/TextInput';
import Button from '../Buttons/Button';

export default function MapSection() {
  const theme = useTheme();
  const { cementGrey, bgGreen, primaryGreen, dirtyWhite } =
    theme.palette.common;

  return (
    <ContentContainer my={SECTIONAL_GAP} color={cementGrey}>
      <Grid container spacing={CONTENT_GAP} mb={SECTIONAL_GAP}>
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          lg={4}
          ml={{ xl: 'auto' }}
          order={{ xs: 1, lg: 2 }}
        >
          <Stack
            ml={{ xl: 4 }}
            p={5}
            borderRadius={BORDER_RADIUS}
            gap={4}
            maxWidth={{ lg: 400, xl: 460, xxl: 480, xxxl: 490 }}
            sx={{
              background: `radial-gradient(50% 50% at 50% 50%, ${alpha(
                bgGreen,
                0.2,
              )} 0%, ${bgGreen} 100%)`,
            }}
          >
            <Typography color={primaryGreen} variant="h5">
              What&apos;s your address
            </Typography>
            <TextInput placeholder="Type address" />
            <Typography color={primaryGreen} variant="h5">
              or
            </Typography>
            <Button label="Use my location" />
          </Stack>
        </Grid>
        <Grid item xs={12} lg={8} order={{ xs: 2, lg: 1 }}>
          <Box
            component="div"
            height={640}
            bgcolor={dirtyWhite}
            borderRadius={BORDER_RADIUS}
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            Map: Pending address list
          </Box>
        </Grid>
      </Grid>
    </ContentContainer>
  );
}
