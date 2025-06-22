import { Box, Typography, useTheme } from '@mui/material';
import { CSSProperties } from 'react';
import { MAX_WIDTH_SM, SECTIONAL_GAP } from '../../utils/styleGlobals';
import AnimationZoomIn from '../Animation/AnimationZoomIn';
import ContentContainer from '../ContentContainer';
import { HeadingAndBodyContentSectionModel } from '../../utils/models/HeadingAndBodyContentSectionModel';
import WysiwygStyledTypography from '../WysiwygStyledTypography';
import Button from '../Buttons/Button';

interface Props {
  align?: CSSProperties['textAlign'];
  data: HeadingAndBodyContentSectionModel;
}

export default function HeadingAndBodyContentSection(props: Props) {
  const { data, align = 'center' } = props;
  const { heading, body, link } = data;

  const theme = useTheme();
  const { cementGrey } = theme.palette.common;

  return (
    <ContentContainer
      my={SECTIONAL_GAP}
      maxWidth={MAX_WIDTH_SM}
      textAlign={align}
      color={cementGrey}
    >
      <AnimationZoomIn>
        <Typography variant="h2" mb={{ xs: 3.75, md: 6.25 }}>
          {heading}
        </Typography>
      </AnimationZoomIn>
      <AnimationZoomIn>
        <WysiwygStyledTypography text={body} />
      </AnimationZoomIn>

      {link && (
        <AnimationZoomIn>
          <Box component="div" mt={{ xs: 3.75, md: 6.25 }}>
            <Button label={link.title} target={link.target} href={link.url} />
          </Box>
        </AnimationZoomIn>
      )}
    </ContentContainer>
  );
}
