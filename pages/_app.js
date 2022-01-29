import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }) {
    return (
        <SessionProvider>
            <div className="container">
                <Component {...pageProps} />
            </div>
        </SessionProvider>
    )
}

export default MyApp
