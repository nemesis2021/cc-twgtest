import { PropsWithChildren } from 'react';
import { ApolloProvider } from '@apollo/client';
import { EmotionCache } from '@emotion/cache';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import theme from '../styles/theme/theme';
import client from '../utils/apolloClient';
import createEmotionCache from '../utils/createEmotionCache';
import PageTransition from './PageTransition';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface Props {
  emotionCache?: EmotionCache;
}

export default function AppWrapper(props: PropsWithChildren<Props>) {
  const { emotionCache = clientSideEmotionCache, children } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PageTransition />
          {children}
        </ThemeProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}
