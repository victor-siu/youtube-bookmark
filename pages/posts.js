export default function Posts({posts}) {
  return (

    <div><h1>posts</h1>
      {(posts && posts.length > 0) ? 
      posts.map(({id,title})=><li key={id}>{title}</li>): <p><strong>Have nothing!!</strong></p>}
    </div>
  )
}
// This function gets called at build time
  export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await res.json()
  
    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props:{posts,}
    }
  }