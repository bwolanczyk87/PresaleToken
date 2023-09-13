import NextApp, { AppProps, AppContext } from 'next/app';
import { Exo } from 'next/font/google';
import Head from 'next/head';
import { MantineProvider, ColorScheme } from '@mantine/core';
import { WagmiConfig, createConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

// google font
const exoFont = Exo({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

// connectKit + wagmi
const config = createConfig(
  getDefaultConfig({
    appName: 'TSTK Pre-sale App',
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    chains: [polygonMumbai],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>TSTK Pre-sale</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <MantineProvider
        theme={{
          colorScheme: 'dark',
          fontFamily: exoFont.style.fontFamily,
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <WagmiConfig config={config}>
          <ConnectKitProvider debugMode>
            <Component {...pageProps} />
          </ConnectKitProvider>
        </WagmiConfig>
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
