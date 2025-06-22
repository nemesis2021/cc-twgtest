import {
  Box,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from '../Buttons/Button';
import {
  FieldTypeEnum,
  FormModel,
} from '../../utils/models/gravityForms/FormFieldModel';
import WysiwygStyledTypography from '../WysiwygStyledTypography';
import useFormOnInvalid from '../../utils/hooks/useFormOnInvalid';
import AnimatedResponsiveContainer from '../Animation/AnimatedResponsiveContainer';
import AnimationExpandVertical from '../Animation/AnimationExpandVertical';
import AnimationTransitionFade from '../Animation/AnimationTransitionFade';
import useForm from '../../utils/hooks/gravityForms/useForm';
import formatFormData from '../../utils/hooks/formatFormData';
import FormField from '../FormField';

interface Props {
  data: FormModel;
}

export default function ContactForm(props: Props) {
  const { data } = props;
  const { formFields, formId, submitButton } = data;

  const [submitted, setSubmitted] = useState(false);
  const { loading, data: submittedData, error, submitForm } = useForm();

  const [recaptcha, setRecaptcha] = useState<null | string>(null);
  const [recaptchaError, setRecaptchaError] = useState(false);

  const { validationError, onvalidReset, handleFormOnInvalidEvent } =
    useFormOnInvalid();

  const captchaFieldId =
    formFields.nodes.find((field) => field.type === FieldTypeEnum.CAPTCHA)
      ?.id ?? null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onvalidReset();

    if (!recaptcha) {
      setRecaptchaError(true);
      return;
    }

    const formData = new FormData(event.currentTarget);

    const fieldValues = formatFormData(
      event.currentTarget,
      formData,
      recaptcha,
      captchaFieldId,
    );

    submitForm({ fieldValues, id: formId });
  };

  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));
  const { strawberryRed, primaryGreen } = theme.palette.common;

  useEffect(() => {
    if (submittedData?.submitGfForm.confirmation) {
      setSubmitted(true);
    }
  }, [submittedData]);

  useEffect(() => {
    if (recaptcha) setRecaptchaError(false);
  }, [recaptcha]);

  return (
    <AnimatedResponsiveContainer>
      <AnimationTransitionFade
        index={submitted ? 1 : 0}
        elements={[
          <form onSubmit={handleSubmit} onInvalid={handleFormOnInvalidEvent}>
            <Grid container rowSpacing={3} columnSpacing={3}>
              {formFields.nodes.map(
                (formField) =>
                  formField.type !== FieldTypeEnum.CAPTCHA && (
                    <Grid item xs={12} md={formField.layoutGridColumnSpan}>
                      <FormField formField={formField} />
                    </Grid>
                  ),
              )}
              <Grid item xs={12}>
                <Stack
                  direction={{ xs: 'column', lg: 'row' }}
                  justifyContent="space-between"
                >
                  <Box component="div">
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
                      onChange={(v) => setRecaptcha(v)}
                    />
                    <AnimationExpandVertical isExpanded={!!recaptchaError}>
                      <Typography pt={4} variant="body2" color={strawberryRed}>
                        Please complete the ReCAPTCHA.
                      </Typography>
                    </AnimationExpandVertical>

                    <AnimationExpandVertical isExpanded={!!validationError}>
                      <Typography pt={4} variant="body2" color={strawberryRed}>
                        Please check your input and try again. Some fields are
                        missing or incorrect.
                      </Typography>
                    </AnimationExpandVertical>
                  </Box>

                  <Stack
                    direction="column"
                    justifyContent={{ md: 'flex-start', lg: 'flex-end' }}
                    pt={{ xs: 5, lg: 0 }}
                  >
                    <Button
                      label={submitButton.text}
                      type="submit"
                      loading={loading}
                      width={isTablet ? 'fit-content' : '100%'}
                    />
                  </Stack>
                </Stack>
              </Grid>
              <AnimationExpandVertical isExpanded={!!error}>
                <Typography pt={4} variant="body2" color={strawberryRed}>
                  {error}
                </Typography>
              </AnimationExpandVertical>
            </Grid>
          </form>,
          <Box
            component="div"
            pt={{ xs: 6.25, md: 0 }}
            minHeight={{ xs: 'auto', md: 525 }}
          >
            <Typography variant="h6" color={primaryGreen}>
              Thanks for submitting!
            </Typography>
            <WysiwygStyledTypography
              text={submittedData?.submitGfForm?.confirmation?.message ?? ''}
            />
          </Box>,
        ]}
      />
    </AnimatedResponsiveContainer>
  );
}
