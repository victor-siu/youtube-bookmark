import Head from 'next/head'
import styles from '../styles/Home.module.css'
// This function gets called at build time
  export async function getStaticProps() {
    // Call an external API endpoint to get videos
    const res = await fetch('https://api.fighter.hk/youtube/videos.php')
    const videos = await res.json()
  
    // By returning { props: videos }, the Blog component
    // will receive `videos` as a prop at build time
    return {
      props:{videos,}
    }
  }

export default function Home({videos}) {
  
  
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Youtube Bookmark</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Youtube Bookmark!
        </h1>

        <div className={styles.flex}>
        <h1>videos</h1>
      {(videos && videos.videos.length > 0) ? 
      videos.videos.map(({vid,url,columnName})=> <iframe key={vid} width="560" height="315"
      src={url.replace("watch?v=","embed/")}  frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen"
      mozallowfullscreen="mozallowfullscreen" 
      msallowfullscreen="msallowfullscreen" 
      oallowfullscreen="oallowfullscreen" 
      webkitallowfullscreen="webkitallowfullscreen">
      </iframe> ): <p><strong>Have nothing!!</strong></p>}
    
        </div>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer> */}
    </div>
  )
}