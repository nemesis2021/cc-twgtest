import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import {
  CONTENT_GAP,
  MAX_WIDTH_SECTION,
  MAX_WIDTH_SM,
  SECTIONAL_GAP,
} from '../../utils/styleGlobals';
import type { TeamSectionModel } from '../../utils/models/pages/AboutUsPageModel';
import type { TeamMemberModel } from '../../utils/models/customPostTypes/TeamMemberModel';
import ContentContainer from '../ContentContainer';
import TeamCard from '../Cards/TeamCard';
import AnimationZoomIn from '../Animation/AnimationZoomIn';
import WysiwygStyledTypography from '../WysiwygStyledTypography';

interface Props {
  data: TeamSectionModel;
  teamMembers: TeamMemberModel[];
}

export default function TeamMembersSection(props: Props) {
  const { data, teamMembers } = props;

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const { cementGrey } = theme.palette.common;

  return (
    <ContentContainer
      position="relative"
      my={SECTIONAL_GAP}
      maxWidth={MAX_WIDTH_SECTION}
    >
      <AnimationZoomIn>
        <Typography variant="h2" color={cementGrey} textAlign="center">
          {data.heading}
        </Typography>
      </AnimationZoomIn>
      <AnimationZoomIn delay={200}>
        <WysiwygStyledTypography
          typographyVariant="body1"
          mt={CONTENT_GAP}
          mb={6.25}
          textAlign="center"
          mx="auto"
          maxWidth={MAX_WIDTH_SM}
          text={data.body ?? ''}
        />
      </AnimationZoomIn>
      <Grid
        container
        columnSpacing={{ xs: 1.5, md: 1.75 }}
        rowSpacing={{ xs: 3.75, md: 7.5 }}
      >
        {teamMembers.map((teamMember, index) => {
          let delay = 0;

          if (isMd && !isXl) {
            delay = (index % 3) * 150;
          } else if (isXl) {
            delay = (index % 4) * 150;
          }

          return (
            <Grid key={teamMember.id} item xs={6} md={4} xl={3}>
              <AnimationZoomIn threshold={0.4} delay={delay}>
                <TeamCard data={teamMember.teamMemberPostType} />
              </AnimationZoomIn>
            </Grid>
          );
        })}
      </Grid>
    </ContentContainer>
  );
}
