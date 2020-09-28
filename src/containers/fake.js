import style from '../../styles/Home.module.css'
import Head from 'next/head'

export function Fake({videosList}){
    return (
        <div>
          <Head>
            <title>YouTube Bookmark</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className={style.app}>
          <h1 className={style.title}>
              Welcome to YouTube Bookmark!(fake)
            </h1>
            <span style={{"color":"red","text-align":"center"}}>This version is using local mock server with local testing database.</span>
            <div className={style.columns_list}>
            <h1>影片</h1>
          {(videosList?.videos?.length > 0) ? 
        videosList.columns.map(({cid,columnName,totalVideos})=>(
        <div key={cid} className={style.column}><div className={style.column_header}><h1 className={style.column_title}>{columnName}</h1><span className={style.total_videos_span}>{totalVideos}</span></div>
        <div className={style.videos_list}>
        {videosList.videos.find(v=>v.columnName==columnName)?videosList.videos.filter(v=>v.columnName==columnName)?.map(({vid,url})=>
            (
              <div key={vid} className={style.video_unit}>
                <iframe width="480" height="360"
        src={url.replace("watch?v=","embed/")}  frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen="allowfullscreen"
        mozallowfullscreen="mozallowfullscreen" 
        msallowfullscreen="msallowfullscreen" 
        oallowfullscreen="oallowfullscreen" 
        webkitallowfullscreen="webkitallowfullscreen">
        </iframe>
      {/* <img src={`https://img.youtube.com/vi/${url.substring(url.lastIndexOf('=')+1)}/hqdefault.jpg`}/> */}
              </div>
            
        )
        ):<h2>No video in column: {columnName}</h2>}</div>
        </div>
        ))
          : <p><strong>loading...</strong></p>}
            </div>
          </main>
        </div>
      )
}