import { Grid, Stack, styled, useMediaQuery, useTheme } from '@mui/material';
import { ContentSection2Model } from '../../../utils/models/pages/MedicalResourceHubPageModel';
import ContentContainer from '../../ContentContainer';
import WysiwygStyledTypography from '../../WysiwygStyledTypography';
import Button from '../../Buttons/Button';
import { MAX_WIDTH_SM } from '../../../utils/styleGlobals';

const StyledTypography = styled(WysiwygStyledTypography)(() => ({
  ul: {
    marginTop: 0,
  },
}));

interface Props {
  data: ContentSection2Model;
}

export default function MedicalHubPageContentSection2(props: Props) {
  const { data } = props;
  const { body1, body2, link1, link2, smallText } = data;

  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));

  return (
    <ContentContainer mt={1.25} maxWidth={MAX_WIDTH_SM} mx="auto">
      <Grid container spacing={{ xs: 5, md: 6.25 }}>
        <Grid item xs={12} md={5.5}>
          <StyledTypography text={body1} mb={{ xs: 0, md: 6.25 }} />

          {isTablet && (
            <Stack rowGap={2}>
              <Button
                label={link1.title}
                target={link1.target}
                href={link1.url}
              />
              <Button
                label={link2.title}
                target={link2.target}
                href={link2.url}
              />
            </Stack>
          )}
        </Grid>
        <Grid item xs={12} md={6.5}>
          <StyledTypography text={body2} />
          <StyledTypography
            text={smallText}
            typographyVariant="body3"
            mb={{ xs: 3.75, md: 0 }}
          />

          {!isTablet && (
            <Stack rowGap={2} justifyContent="center" alignItems="center">
              <Button
                label={link1.title}
                target={link1.target}
                href={link1.url}
              />
              <Button
                label={link2.title}
                target={link2.target}
                href={link2.url}
              />
            </Stack>
          )}
        </Grid>
      </Grid>
    </ContentContainer>
  );
}
