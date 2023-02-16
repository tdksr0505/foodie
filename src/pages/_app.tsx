import type { AppProps } from 'next/app';
import React from 'react';
import Layout from '../components/Layout';
import Background from '../components/Background';
import GlobalStyles from '../styled/globalStyles';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../config/theme';
import { SnackbarProvider } from '../context/snackbarContext';
import { LoadingProvider } from '../context/loadingContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <LoadingProvider>
          <SnackbarProvider>
            <>
              <GlobalStyles />
              <Background />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </>
          </SnackbarProvider>
        </LoadingProvider>
      </ThemeProvider>
    </>
  );
}
