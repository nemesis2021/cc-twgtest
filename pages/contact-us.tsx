import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { HeadModel } from '../utils/models/rankmath/HeadModel';
import { CONTACT_US_PAGE } from '../utils/routes';
import {
  CONTENT_GAP,
  NAV_HEIGHT_MD,
  NAV_HEIGHT_XS,
  SECTIONAL_GAP,
} from '../utils/styleGlobals';
import { CONTACT_FORM_ID, REVALIDATE_PAGES } from '../utils/globals';
import type { ContactUsPageModel } from '../utils/models/pages/ContactUsPageModel';
import type { FormModel } from '../utils/models/gravityForms/FormFieldModel';
import getHead from '../utils/queries/rankmath/getHead';
import getForm from '../utils/queries/getForm';
import getContactUsPage from '../utils/queries/pages/getContactUsPage';
import ContentContainer from '../components/ContentContainer';
import BreadCrumbs from '../components/Breadcrumbs';
import AnimatedDivider from '../components/AnimatedDivider';
import AnimatedBackgroundWrapper from '../components/AnimatedBackgroundWrapper';

const MetaData = dynamic(() => import('../components/MetaData'));
const ContactInfoSection = dynamic(
  () => import('../components/Sections/ContactUsPage/ContactInfoSection'),
);
const ContactForm = dynamic(() => import('../components/Forms/ContactForm'));

interface Props {
  head: HeadModel;
  page: ContactUsPageModel;
  form: FormModel;
}

function ContactUs(props: Props) {
  const { head, page, form } = props;
  const { contactInfoSection, heading, description } = page.contactUsPage;

  const theme = useTheme();
  const { primaryGreen, white } = theme.palette.common;

  return (
    <>
      <MetaData head={head} />
      <AnimatedBackgroundWrapper color={white} immediate>
        <ContentContainer>
          <BreadCrumbs
            pt={{ xs: NAV_HEIGHT_XS + 0.5, md: NAV_HEIGHT_MD + 0.5 }}
            mb={2}
          />
          <Grid container spacing={CONTENT_GAP} mb={SECTIONAL_GAP}>
            <Grid
              item
              xs={12}
              md={5}
              lg={4}
              ml={{ xl: 'auto' }}
              order={{ xs: 2, md: 1 }}
            >
              <ContactInfoSection data={contactInfoSection} />
            </Grid>
            <Grid item xs={12} md={6} lg={8} order={{ xs: 1, md: 2 }}>
              <Typography variant="h1" color={primaryGreen} maxWidth={1000}>
                {heading}
              </Typography>
              {description && (
                <Typography variant="body2" mt={2.25} maxWidth={1000}>
                  {description}
                </Typography>
              )}
              <Box component="div" maxWidth={1000} mt={6.25}>
                <ContactForm data={form} />
              </Box>
            </Grid>
          </Grid>
          <AnimatedDivider />
        </ContentContainer>
      </AnimatedBackgroundWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const head = await getHead({ url: CONTACT_US_PAGE });
  const page = await getContactUsPage();
  const form = await getForm({ id: CONTACT_FORM_ID });

  const props: Props = {
    head,
    page,
    form,
  };

  return { props, notFound: page === null, revalidate: REVALIDATE_PAGES };
};
export default ContactUs;
