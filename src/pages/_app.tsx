import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import GlobalStyles from '../styled/globalStyles';

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
