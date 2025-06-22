import { GoogleAnalytics } from "@next/third-parties/google";
import type { AppProps } from "next/app";
import "../lib/styles/app.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-KMMXPJXFVP" />
    </>
  );
}

export default MyApp;
