import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/nprogress.css';
import NProgress from 'nprogress';
import Router from 'next/router';
import Layout from '../components/Layout';
import Background from '../components/Background';
import GlobalStyles from '../styles/globalStyles';
import { SnackbarProvider } from '../context/snackbarContext';
import { LoadingProvider } from '../context/loadingContext';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
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
