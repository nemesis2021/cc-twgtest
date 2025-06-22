import { useEffect, useState } from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import AnimatedModal from '../../AnimatedModal';
import { MedicalHubPageConsentModel } from '../../../utils/models/MedicalHubPageConsentModel';
import WysiwygStyledTypography from '../../WysiwygStyledTypography';
import Button from '../../Buttons/Button';

interface Props {
  data: MedicalHubPageConsentModel;
}

export default function ConsentModal(props: Props) {
  const { data } = props;
  const { heading, body } = data;

  const [isOpen, setIsOpen] = useState(false);

  const theme = useTheme();
  const { primaryGreen, cementGrey } = theme.palette.common;

  const handleClose = (accept: boolean) => {
    setIsOpen(() => {
      if (accept) {
        window.localStorage.setItem('medical-hub-page-consent', '1');
      }

      return false;
    });
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const consent = window.localStorage.getItem('medical-hub-page-consent');

    if (consent && consent === '1') {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  return (
    <AnimatedModal
      open={isOpen}
      handleClose={() => handleClose(false)}
      backdropEvent={false}
    >
      <Stack rowGap={4.5} textAlign="center" alignItems="center">
        <Typography variant="h3" color={primaryGreen}>
          {heading}
        </Typography>
        <WysiwygStyledTypography text={body} color={cementGrey} />
        <Button label="I Accept" onClick={() => handleClose(true)} />
      </Stack>
    </AnimatedModal>
  );
}
