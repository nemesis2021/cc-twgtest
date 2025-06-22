import { useMediaQuery, useTheme } from '@mui/material';
import { MenuModel } from '../../utils/models/MenuModel';
import NavBarDesktop from './NavBarDesktop';
import NavBarMobile from './NavBarMobile';
import { HeaderContentModel } from '../../utils/models/NavigationModel';
import { ImageModel } from '../../utils/models/ImageModel';
import useGetAnnouncement from '../../utils/hooks/useGetAnnouncement';

interface Props {
  menu?: MenuModel;
  logo?: ImageModel;
  headerContent?: HeaderContentModel;
}

export default function NavBar(props: Props) {
  const { logo, headerContent } = props;
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up('lg'));

  const { data: announcement } = useGetAnnouncement();

  return isTablet ? (
    <NavBarDesktop
      {...props}
      logo={logo}
      headerContent={headerContent}
      announcement={announcement}
    />
  ) : (
    <NavBarMobile
      {...props}
      logo={logo}
      headerContent={headerContent}
      announcement={announcement}
    />
  );
}
