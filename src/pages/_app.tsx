import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import GlobalStyles from '../styles/globalStyle';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
