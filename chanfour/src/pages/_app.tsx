import { ChakraProvider, Flex, Text, Image } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RecoilEnv, RecoilRoot } from 'recoil';
import { theme } from '../chakra/theme';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
const Loader = () => (
  <Flex
    align={'center'}
    pt={40}
    // justify={'center'}
    height={'100%'}
    width={'100%'}
    backdropFilter={'blur(2px)'}
    position={'absolute'}
    bg={'transparent'}
    zIndex={10000}
    flexDirection={'column'}
  >
    <Image
      src='https://c.tenor.com/DcVyAybHshEAAAAC/tenor.gif'
      border={'3px solid white'}
      position={'sticky'}
      top={'200px'}
      width={'400px'}
    />
    <Text
      color={'white'}
      fontSize={20}
    >
      PLS WAIT. . . :)
    </Text>
  </Flex>
);
function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = (url: string) => setLoading(true);
    const handleComplete = (url: string) => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Head >
          <title>
            SAITAMA
          </title>
          <link rel="icon" href="/leaf.png" />
        </Head>
        {loading && <Loader />}
        {/* <Loader /> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot >
  )
};

export default App;