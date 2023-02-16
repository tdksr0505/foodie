import type { AppProps } from 'next/app';
import React from 'react';
import Layout from '../components/Layout';
import Background from '../components/Background';
import GlobalStyles from '../styled/globalStyles';
import { SnackbarProvider } from '../context/snackbarContext';
import { LoadingProvider } from '../context/loadingContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
    </>
  );
}
