import '../styles/globals.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useGLTF } from '@react-three/drei';
import type { AppContext, AppProps } from 'next/app';
import { EmotionCache } from '@emotion/cache';
import App from 'next/app';
import { useEffect } from 'react';
import createEmotionCache from '../utils/createEmotionCache';
import getMenu from '../utils/queries/getMenu';
import getNavigationContent from '../utils/queries/getNavigationContent';
import getInstagramSection from '../utils/queries/globals/getInstagramSection';
import { FOOTER_MENU, HEADER_MENU } from '../utils/menus';
import type { MenuModel } from '../utils/models/MenuModel';
import type { InstagramSectionModel } from '../utils/models/sections/InstagramSectionModel';
import type { NavigationContentModel } from '../utils/models/NavigationModel';
import {
  CLINICAL_STUDIES_PAGE,
  CLINICAL_STUDY_PATH,
  COOKIE_POLICY_PAGE,
  MEDICAL_RESOURCE_HUB_PAGE,
  PUBLICATIONS_PAGE,
  OUR_SCIENCE_PAGE,
  STAGES_PAGE,
  STOCKISTS_PAGE,
} from '../utils/routes';
import SmoothScrollContainer from '../components/Animation/Parallax/SmoothScrollContainer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const AppWrapper = dynamic(() => import('../components/AppWrapper'));
const NavBar = dynamic(() => import('../components/Navigation/NavBar'));
const InstagramSection = dynamic(
  () => import('../components/Sections/InstagramSection'),
);
const Footer = dynamic(() => import('../components/Footer/Footer'));

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const HIDE_INSTAGRAM_PATHS = [
  MEDICAL_RESOURCE_HUB_PAGE,
  OUR_SCIENCE_PAGE,
  PUBLICATIONS_PAGE,
  CLINICAL_STUDIES_PAGE,
  CLINICAL_STUDY_PATH,
  STAGES_PAGE,
  STOCKISTS_PAGE,
  COOKIE_POLICY_PAGE,
];

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  headerMenu?: MenuModel;
  footerMenu?: MenuModel;
  navigationContent?: NavigationContentModel;
  instagramSection: InstagramSectionModel;
}

const theme = createTheme({
  typography: {
    // Apply superscript globally to all Typography components where ® is used
    allVariants: {
      '& sup': {
        verticalAlign: 'super',
        fontSize: 'smaller',
      },
    },
  },
});

function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    headerMenu,
    footerMenu,
    navigationContent,
    instagramSection,
  } = props;

  useGLTF.preload('/gltfs/can.gltf');

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  const router = useRouter();

  const shouldShowInstagram =
    !HIDE_INSTAGRAM_PATHS.some((path) => router.pathname.startsWith(path)) &&
    instagramSection.visibility === 'Visible';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppWrapper emotionCache={emotionCache}>
        <NavBar
          menu={headerMenu}
          logo={navigationContent?.logo}
          headerContent={navigationContent?.headerContent}
        />
        <SmoothScrollContainer>
          <Component {...pageProps} />
          {shouldShowInstagram && <InstagramSection data={instagramSection} />}
          <Footer
            menu={footerMenu}
            logo={navigationContent?.logo}
            footerContent={navigationContent?.footerContent}
          />
        </SmoothScrollContainer>
      </AppWrapper>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const headerMenu = await getMenu({ id: HEADER_MENU });
  const footerMenu = await getMenu({ id: FOOTER_MENU });
  const instagramSection = await getInstagramSection();
  const navigationContent = await getNavigationContent();

  return {
    ...appProps,
    headerMenu,
    footerMenu,
    navigationContent,
    instagramSection,
  };
};

export default MyApp;
