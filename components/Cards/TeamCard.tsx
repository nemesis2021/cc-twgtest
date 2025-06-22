import { Box, Stack, Typography, useTheme } from '@mui/material';
import { TeamCardModel } from '../../utils/models/cards/TeamCardModel';
import AnimatedImage from '../AnimatedImage';
import { BORDER_RADIUS_SM } from '../../utils/styleGlobals';

interface Props {
  data: TeamCardModel;
}

export default function TeamCard(props: Props) {
  const { data } = props;
  const { position, name, image, description } = data;

  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const { cementGrey, greenTeaGreen, dirtyWhite } = theme.palette.common;

  return (
    <Stack>
      <Box
        component="div"
        position="relative"
        borderRadius={BORDER_RADIUS_SM}
        width="100%"
        sx={{ aspectRatio: '305/263' }}
        overflow="hidden"
        mb={3.125}
        bgcolor={dirtyWhite}
      >
        {image && (
          <AnimatedImage
            width="100%"
            src={image?.node.sourceUrl || ''}
            sizes={`(max-width: ${md}px) 60vw, 22vw`}
          />
        )}
      </Box>
      {position && (
        <Typography variant="label" color={greenTeaGreen}>
          {position}
        </Typography>
      )}

      <Typography variant="h5" component="p" color={cementGrey} my={1}>
        {name}
      </Typography>
      {description && (
        <Typography variant="body2" color={cementGrey}>
          {description}
        </Typography>
      )}
    </Stack>
  );
}
