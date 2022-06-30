import '../styles/globals.css'
import '../styles/Login.css'
import "./../highlight/styles/atom-one-dark.min.css"
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

    return (
        <SessionProvider>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
            </Head>
            <div className="container">
                <Component {...pageProps} />
            </div>
        </SessionProvider>
    )
}

export default MyApp