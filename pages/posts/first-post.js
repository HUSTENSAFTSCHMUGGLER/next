import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Script from 'next/script'

export default function FirstPost() {
    return (
        <>
            <Head>
                <title>First Post</title>
            </Head>
            <h1>First Post</h1>
            <h2>
                <Link href="/">
                    <a>Back to Home</a>
                </Link>
            </h2>
            <Image
                src="/logo.png"
                height={144}
                width={144}
                alt='A LLOTAN logo'        
            />
            <Script
                src='https://connect.facebook.net/en_US/sdk.js'
                strategy='lazyOnload'
                onLoad={() =>
                    console.log('script loadet')
                }
            />
        </>
    )
}