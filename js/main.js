var youbook = new Vue(
  {
    el: '#app',
    vuetify: new Vuetify(),
    router: new VueRouter(
      {
      }
    ),
    data: {
      theme: 'red',
      videoQuery: {},
    },
    computed: {
    },
    methods: {
      fetchQuery(){
        axios('https://api.fighter.hk/youtube/videos.php').then(
          res =>{
            this.videoQuery = res.data.videos;

          }
        )
      },
      videoThumb(url){
        var id, temp;
        id = url.match(/[^v=]*$/);
        temp = 'https://img.youtube.com/vi/' + id + '/0.jpg'
        return temp;
      }
    },
    mounted(){
      this.fetchQuery();
    }
  }
)
