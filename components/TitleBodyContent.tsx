import { Stack, Typography, useTheme } from '@mui/material';
import WysiwygStyledTypography from './WysiwygStyledTypography';

interface Props {
  data: {
    title: string;
    body: string;
  }[];
}

export default function TitleBodyContent(props: Props) {
  const { data: contents } = props;

  const theme = useTheme();
  const { cementGrey, primaryGreen } = theme.palette.common;

  return (
    <Stack color={cementGrey} rowGap={3.75}>
      {contents.map(({ title, body }) => (
        <div>
          {title && (
            <Typography variant="h5" mb={1.25} color={primaryGreen}>
              {title}
            </Typography>
          )}
          {body && <WysiwygStyledTypography text={body} />}
        </div>
      ))}
    </Stack>
  );
}
