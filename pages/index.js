import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import clientPromise from '../lib/mongodb'

export default function Home({ isConnected }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Read{' '}
          <Link href={"/posts/first-post"}>
            <a>this page</a>
          </Link>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://ionos.space/setup?repo=https://github.com/ionos-deploy-now/hello-next"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Deploy Now.
            </p>
          </a>
        </div>
      </main>
        <footer className={styles.footer}>
              {isConnected ? (
                  <a className="subtitle">You are connected to MongoDB</a>
              ) : (
                  <a className="subtitle">
                      You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
                      for instructions.
                  </a>
              )}

        {/*<a*/}
        {/*  href="https://ionos.space"*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  Powered by IONOS*/}
        {/*</a>*/}
        </footer>
    </div>
  )
}

export async function getServerSideProps(context) {
    try {
        // client.db() will be the default database passed in the MONGODB_URI
        // You can change the database by calling the client.db() function and specifying a database like:
        // const db = client.db("myDatabase");
        // Then you can execute queries against your database like so:
        // db.find({}) or any of the MongoDB Node Driver commands
        await clientPromise
        return {
            props: { isConnected: true },
        }
    } catch (e) {
        console.error(e)
        return {
            props: { isConnected: false },
        }
    }
}