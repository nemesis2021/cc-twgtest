import { ChangeEvent, PropsWithoutRef, useState } from 'react';
import {
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { MAX_WIDTH_SM, SECTIONAL_GAP } from '../../utils/styleGlobals';
import Accordion from '../Accordion';
import ContentContainer, { ContentContainerProps } from '../ContentContainer';
import SearchInput from '../Inputs/SearchInput';
import AnimationTransitionFade from '../Animation/AnimationTransitionFade';
import AnimatedResponsiveContainer from '../Animation/AnimatedResponsiveContainer';
import { FaqsSectionModel } from '../../utils/models/sections/FaqsSectionModel';
import WysiwygStyledTypography from '../WysiwygStyledTypography';
import AnimationZoomIn from '../Animation/AnimationZoomIn';
import Button from '../Buttons/Button';

const FAQ_LENGTH_SEARCH = 5;

const StyledSearchContainer = styled('form')(({ theme }) => ({
  textAlign: 'center',
  paddingBottom: theme.spacing(6.25),
  maxWidth: 548,
  margin: '0 auto',
}));

interface Props extends ContentContainerProps {
  data: FaqsSectionModel;
  search?: boolean;
}

export default function FaqWithSearchSection(props: PropsWithoutRef<Props>) {
  const { data, search = true, ...restProps } = props;
  const { faqs: faqList, heading, smallText, link } = data;
  const [faqs, setFaqs] = useState(faqList);
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const isMobile = useMediaQuery(theme.breakpoints.down(md));
  const { cementGrey } = theme.palette.common;

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const lowerCaseValue = value.toLowerCase();

    setSearchValue(value);

    if (!value) {
      setFaqs(faqList);
      setError(false);
      return;
    }

    const filteredFaq =
      faqList?.filter(
        (faq) =>
          faq.title.toLowerCase().includes(lowerCaseValue) ||
          faq.body.toLowerCase().includes(lowerCaseValue),
      ) ?? [];

    if (filteredFaq.length <= 0) {
      setError(true);
      return;
    }

    setError(false);
    setFaqs(filteredFaq);
  };

  const handleClear = () => {
    setFaqs(faqList);
    setSearchValue('');
  };

  return (
    <ContentContainer
      mt={3.75}
      mb={SECTIONAL_GAP}
      maxWidth={MAX_WIDTH_SM}
      {...restProps}
    >
      {faqList && faqList.length > FAQ_LENGTH_SEARCH && search && (
        <StyledSearchContainer>
          <SearchInput
            value={searchValue}
            onClear={handleClear}
            onChange={handleOnChange}
            placeholder="Search"
          />
        </StyledSearchContainer>
      )}

      {heading && (
        <Typography color={cementGrey} variant="h2" mb={6.25}>
          {heading}
        </Typography>
      )}

      <AnimatedResponsiveContainer>
        <AnimationTransitionFade
          index={error ? 0 : 1}
          elements={[
            <Typography color={cementGrey}>No results found.</Typography>,
            <Accordion data={faqs ?? []} firstItemOpen />,
          ]}
        />
      </AnimatedResponsiveContainer>

      {link && (
        <AnimationZoomIn>
          <Stack
            justifyContent="center"
            alignItems="center"
            my={{ xs: 3.75, md: 5 }}
          >
            <Button
              label={link.title}
              href={link.url}
              target={link.target}
              width={isMobile ? '100%' : 'fit-content'}
            />
          </Stack>
        </AnimationZoomIn>
      )}

      {smallText && (
        <WysiwygStyledTypography
          text={smallText}
          typographyVariant="body3"
          mt={{ xs: 3.75, md: 6.25 }}
        />
      )}
    </ContentContainer>
  );
}
