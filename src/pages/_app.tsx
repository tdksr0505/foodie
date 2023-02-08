import type { AppProps } from 'next/app';
import React from 'react';
import Layout from '../components/Layout';
import GlobalStyles from '../styled/globalStyles';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../config/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
