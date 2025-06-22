import type { AppProps } from "next/app";
import "../lib/styles/app.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
