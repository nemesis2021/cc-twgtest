import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import { IconListSectionModel } from '../../../utils/models/pages/MedicalResourceHubPageModel';
import ContentContainer from '../../ContentContainer';
import { SECTIONAL_GAP } from '../../../utils/styleGlobals';
import WysiwygStyledTypography from '../../WysiwygStyledTypography';
import AnimatedImage from '../../AnimatedImage';
import Button from '../../Buttons/Button';

interface Props {
  data: IconListSectionModel;
}

export default function IconListSection(props: Props) {
  const { data } = props;
  const { heading, link, contents } = data;

  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const { cementGrey } = theme.palette.common;

  return (
    <ContentContainer my={SECTIONAL_GAP} color={cementGrey} textAlign="center">
      <Stack rowGap={{ xs: 4.5, md: 6.25 }}>
        <Typography variant="h2" mb={{ xs: 3.75, md: 6.25 }}>
          {heading}
        </Typography>
        <Grid container spacing={4.5}>
          {contents.map((content) => (
            <Grid item xs={12} md={6} xl={3} key={content.title}>
              <Box
                component="div"
                position="relative"
                width={{ xs: '23.47vw', md: '9vw' }}
                height={{ xs: '23.47vw', md: '9vw' }}
                mx="auto"
                mb={3.5}
                maxWidth={89}
                maxHeight={89}
              >
                <AnimatedImage
                  src={content.image.node.sourceUrl}
                  alt={content.image.node.altText}
                  sizes={`(max-width: ${md}px) 100vw, 33.33vw`}
                />
              </Box>
              <Typography variant="h6" mb={2}>
                {content.title}
              </Typography>
              <WysiwygStyledTypography
                mx="auto"
                text={content.description}
                maxWidth={400}
              />
            </Grid>
          ))}
        </Grid>

        {link && (
          <Box component="div" textAlign="center">
            <Button label={link.title} target={link.target} href={link.url} />
          </Box>
        )}
      </Stack>
    </ContentContainer>
  );
}
