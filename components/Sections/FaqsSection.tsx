import { StackProps, Typography, useTheme } from '@mui/material';
import Accordion from '../Accordion';
import ContentContainer from '../ContentContainer';
import {
  CONTENT_GAP,
  MAX_WIDTH_SM,
  SECTIONAL_GAP,
} from '../../utils/styleGlobals';
import type { FaqsSectionModel } from '../../utils/models/sections/FaqsSectionModel';

interface Props extends StackProps {
  data: FaqsSectionModel;
  firstItemOpen?: boolean;
}

export default function FaqsSection({
  data,

  firstItemOpen,
}: Props) {
  const { heading, faqs } = data;
  const theme = useTheme();
  const { cementGrey } = theme.palette.common;

  return (
    <ContentContainer maxWidth={MAX_WIDTH_SM} mx="auto" my={SECTIONAL_GAP}>
      <Typography variant="h2" mb={CONTENT_GAP} color={cementGrey}>
        {heading}
      </Typography>

      <Accordion data={faqs} firstItemOpen={firstItemOpen} />
    </ContentContainer>
  );
}
