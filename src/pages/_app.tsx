import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/index.css";
import { GlobalContextProvider } from "../context/GlobalContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>LMT</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </>
  );
}

export default MyApp;
