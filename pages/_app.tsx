import NextApp, { AppProps, AppContext } from 'next/app';
import { PT_Sans } from 'next/font/google';
import Head from 'next/head';
import { MantineProvider, ColorScheme } from '@mantine/core';

const barlowCondensed = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>TSTX Pre-sale</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <MantineProvider
        theme={{ colorScheme: 'dark', fontFamily: barlowCondensed.style.fontFamily }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
  };
};
