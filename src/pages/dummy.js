import {Fake} from '../containers/fake';
export async function getStaticProps() {
    console.log("doing");
    const res = await fetch('http://localhost:4002/vinfo')
    const videosList = await res.json()
    return {
        props:{
            videosList
        }
    }
  }
export default Fake;