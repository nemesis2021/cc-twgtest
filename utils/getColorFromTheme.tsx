import theme from '../styles/theme/theme';
import { ColorTheme } from './models/ColorTheme';

export default function getColorFromTheme(
  colorTheme: ColorTheme,
): string | undefined {
  const [[, color]] = Object.entries(theme.palette.common).filter(
    (commonColor) => commonColor[0] === colorTheme[0],
  );

  return color;
}
