import styles from './../components/iframe.module.css';

export default function Home({ isConnected }) {
  return (
    <div id="container" className={styles.container}>
      <iframe className={styles.iframe} src="https://saharmor.me/dalle-playground/?backendUrl=https://previously-wound-livestock-swift.trycloudflare.com" id="iframe" rameborder="0" crossOrigin="anonymous"></iframe>
    </div>
  )
}