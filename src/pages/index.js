import {Homepage} from '../containers/hompage';
export async function getStaticProps() {
    
  const res = await fetch('https://api.fighter.hk/youtube/videos.php')
  const videosList = await res.json()
  return {
      props:{
          videosList
      }
  }
}
export default Homepage;