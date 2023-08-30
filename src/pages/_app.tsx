import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { GlobalContextProvider } from "../context/GlobalContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripe = loadStripe(
  "pk_test_51K4XvnGBECdG5IyzEdQ4BMi53yea0W14kzmU27JkHwM9u8Qt5xHgtsmWE2WyVTyA2S6KeRDvHxoRur5bGICEkCTM00RvgGLbCY"
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>LMT</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Elements stripe={stripe}>
        <GlobalContextProvider>
          <Component {...pageProps} />
        </GlobalContextProvider>
      </Elements>
    </>
  );
}

export default MyApp;
