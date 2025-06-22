import { alpha, Stack, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import type { ContactInfoSectionModel } from '../../../utils/models/pages/ContactUsPageModel';
import { BORDER_RADIUS } from '../../../utils/styleGlobals';
import AnimationZoomIn from '../../Animation/AnimationZoomIn';

interface Props {
  data: ContactInfoSectionModel;
}

function ContactInfoSection(props: Props) {
  const { data } = props;
  const { phone, address, addressLink, infoList } = data;

  const theme = useTheme();
  const { primaryGreen, bgGreen } = theme.palette.common;

  return (
    <AnimationZoomIn delay={600} threshold={0.1}>
      <Stack
        ml={{ xl: 4 }}
        p={5}
        borderRadius={BORDER_RADIUS}
        gap={5}
        maxWidth={{ lg: 400, xl: 460, xxl: 480, xxxl: 490 }}
        sx={{
          background: `radial-gradient(50% 50% at 50% 50%, ${alpha(
            bgGreen,
            0.2,
          )} 0%, ${bgGreen} 100%)`,
        }}
      >
        <div>
          <Typography variant="h5" color={primaryGreen} component="p">
            Address:
          </Typography>
          <Typography mt={1.4}>
            <Link
              href={addressLink}
              target="_blank"
              aria-label={`Address: ${address}`}
            >
              {address}
            </Link>
          </Typography>
        </div>
        <div>
          <Typography variant="h5" color={primaryGreen} component="p">
            Phone:
          </Typography>
          <Typography mt={1.4}>
            <Link
              href={`tel:${phone}`}
              target="_blank"
              aria-label={`Phone to ${phone}`}
            >
              {phone}
            </Link>
          </Typography>
        </div>
        {infoList.map((item) => (
          <div>
            <Typography variant="h5" color={primaryGreen} component="p">
              {item.label}
            </Typography>
            <Typography mt={1.4}>
              <Link
                href={item.link.url}
                target={item.link.target || '_blank'}
                aria-label={item.link.url}
              >
                {item.link.url.replace('http://', '')}
              </Link>
            </Typography>
          </div>
        ))}
      </Stack>
    </AnimationZoomIn>
  );
}

export default ContactInfoSection;
