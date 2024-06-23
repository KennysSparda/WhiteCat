// pages/_app.js
import React from 'react'
import Head from 'next/head'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>White Cat</title>
        <link rel="shortcut icon" href=""></link>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp