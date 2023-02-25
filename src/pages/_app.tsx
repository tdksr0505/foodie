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
import { AuthProvider } from '../context/authContext';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../store';
import theme from '../config/theme';
import { ThemeProvider } from '@mui/material/styles';

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
              <AuthProvider>
                <>
                  <GlobalStyles />
                  <Background />
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                  <Gotop />
                </>
              </AuthProvider>
            </SnackbarProvider>
          </LoadingProvider>
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
}
