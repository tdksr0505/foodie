import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import '../styles/nprogress.css';
import NProgress from 'nprogress';
import Router from 'next/router';
import Layout from '../components/Layout';
import Background from '../components/Background';
import Gotop from '../components/Gotop';
import GlobalStyles from '../styles/globalStyles';
import { SnackbarProvider } from '../context/snackbarContext';
import { LoadingProvider } from '../context/loadingContext';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../store';
import theme from '../config/theme';
import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>MoguMogu</title>
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </Head>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <LoadingProvider>
            <SnackbarProvider>
              <SessionProvider session={session}>
                <>
                  <GlobalStyles />
                  <Background />
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                  <Gotop />
                </>
              </SessionProvider>
            </SnackbarProvider>
          </LoadingProvider>
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
}
