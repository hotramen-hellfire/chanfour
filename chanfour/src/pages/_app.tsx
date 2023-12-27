import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/Layout/Layout';
import { theme } from '../chakra/theme';
import Head from 'next/head';
import { RecoilEnv, RecoilRoot } from 'recoil';
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
function App({ Component, pageProps }: AppProps) {
  return (
    //     <Head >
    //   <title>
    //     SAITAMA
    //   </title>
    //   <link rel="icon" href="/leaf.png" />
    // </Head>

    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Head >
          <title>
            SAITAMA
          </title>
          <link rel="icon" href="/leaf.png" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot >
  )
};

export default App;