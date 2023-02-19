import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
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

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <ReduxProvider store={store}>
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
      </ReduxProvider>
    </>
  );
}
