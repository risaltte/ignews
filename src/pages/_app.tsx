import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { SessionProvider as NextAuthPovider } from 'next-auth/react'

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthPovider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthPovider>
  );
}

export default MyApp
