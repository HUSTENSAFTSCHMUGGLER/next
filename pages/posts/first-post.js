import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout'
import clientPromise from '../../lib/mongodb'

export default function FirstPost({ accounts }) {
    console.log(accounts);

    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            <h1>First Post</h1>
            <form>
                <input type="text" name="textfeldeingabe"/>
                <input type="submit" name="submit"/>
            </form>
            <h2>
                <Link href="/">
                    <a>Back to Home</a>
                </Link>
            </h2>
            <div>
                {accounts && accounts.map(account => (
                    <>
                        <h2>{account.firstname}</h2>
                    </>
                ))}
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {

    const client = await clientPromise
    const db = client.db("llotanusersdb");

    const data = await db.collection("posts").find({}).toArray()

    const accounts = JSON.parse(JSON.stringify(data));

    try {
        // client.db() will be the default database passed in the MONGODB_URI
        // You can change the database by calling the client.db() function and specifying a database like:
        // const db = client.db("myDatabase");
        // Then you can execute queries against your database like so:
        // db.find({}) or any of the MongoDB Node Driver commands
        await clientPromise
        return {
            props: { isConnected: true, accounts: accounts },
        }
    } catch (e) {
        console.error(e)
        return {
            props: { isConnected: false },
        }
    }
}