import NextApp, { AppProps, AppContext } from 'next/app';
import { Exo } from 'next/font/google';
import Head from 'next/head';
import { MantineProvider, ColorScheme } from '@mantine/core';
import { configureChains, WagmiConfig, useAccount, createConfig } from 'wagmi';
import { flare } from 'wagmi/chains';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { Chain } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { alchemyProvider } from 'wagmi/providers/alchemy';

// const customChain = {
//   id: 14, 
//   name: 'Flare mainnet',
//   network: 'flare',
//   nativeCurrency: {
//     name: 'Flare',
//     symbol: 'FRL',
//     decimals: 18,
//   },
//   rpcUrls: {
//     default: '',
//     public: 'https://flare-api.flare.network/ext/bc/C/rpc'
//   },
//   blockExplorers: {
//     default: { name: 'Flare Explorer', url: 'https://flare-explorer.flare.network/' },
//   },
//   testnet: false,
// };


// const customChainConfig: Chain = {
//   id: customChain.id,
//   name: customChain.name,
//   network: customChain.network,
//   nativeCurrency: customChain.nativeCurrency,
//   rpcUrls: customChain.rpcUrls,
//   blockExplorers: customChain.blockExplorers,
//   testnet: customChain.testnet,
// };


// configure chains
// const { chains } = configureChains(
//   [customChain],
//   [
//     publicProvider(),
//     jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) }),
  
//   ]
// );

// google font
const exoFont = Exo({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

// connectKit + wagmi
const config = createConfig(
  getDefaultConfig({
    appName: 'Worms Pre-Sale App',
    chains: [flare],
    walletConnectProjectId: process.env.WALLET_ID!,
  })
);

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>WM Pre-sale</title>
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
