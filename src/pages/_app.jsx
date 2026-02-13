// pages/_app.js
import React from "react";
import Head from "next/head";
import { ConfirmProvider } from "../componentes/confirm/ConfirmProvider";
import { MovimentacoesFiltersProvider } from "../context/MovimentacoesFiltersContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ConfirmProvider>
      <MovimentacoesFiltersProvider>
        <Head>
          <title>Self Control</title>
          <link rel="shortcut icon" href="/img/favicon.ico" />
        </Head>

        <Component {...pageProps} />
      </MovimentacoesFiltersProvider>
    </ConfirmProvider>
  );
}

export default MyApp;
