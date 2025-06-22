import { Box, Stack, Typography, useTheme } from '@mui/material';
import AnimatedImage from '../AnimatedImage';
import { StepCardModel } from '../../utils/models/sections/SlideSectionModel';
import { BORDER_RADIUS, CONTENT_GAP } from '../../utils/styleGlobals';

interface Props {
  data: StepCardModel;
  rotation?: number;
}

export default function StepCard(props: Props) {
  const { data, rotation = 0 } = props;
  const { image, title, body1, body2 } = data;
  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const { primaryGreen, cementGrey, dirtyWhite } = theme.palette.common;

  return (
    <Stack
      textAlign="center"
      alignItems="center"
      overflow="hidden"
      borderRadius={BORDER_RADIUS}
      width={{ xs: '92vw', md: 386, lg: 400, xl: 420, xxl: 460, xxxl: 480 }}
      bgcolor={dirtyWhite}
      sx={{
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'rotate(0deg)',
        },
      }}
    >
      {image && (
        <Box
          component="div"
          position="relative"
          width="100%"
          height={265}
          overflow="hidden"
        >
          <AnimatedImage
            width="100%"
            src={image.node.sourceUrl}
            sizes={`(max-width: ${md}px) 60vw, 22vw`}
          />
        </Box>
      )}
      <Stack gap={{ xs: 1, md: 1.5, xl: 1.8 }} p={CONTENT_GAP}>
        {title && (
          <Typography variant="h4" color={primaryGreen}>
            {title}
          </Typography>
        )}
        {body1 && (
          <Typography variant="body1" color={cementGrey} fontWeight="bold">
            {body1}
          </Typography>
        )}
        {body2 && (
          <Typography variant="body2" color={cementGrey}>
            {body2}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
