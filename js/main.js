var youbook = new Vue(
  {
    el: '#app',
    vuetify: new Vuetify(),
    router: new VueRouter(
      {
      }
    ),
    data: {
      theme: 'red darken-2',
      videoQuery: {},
      columnQuery: {},
      bottomNav: 0
    },
    computed: {
    },
    methods: {
      fetchVideos(){
        axios('https://api.fighter.hk/youtube/videos.php').then(
          res =>{
            this.videoQuery = res.data.videos;
          }
        ).then(
          ()=>{
            this.videoQuery.forEach(video=>{
              video.watchHere = false;
            })
          }
        )
      },
      fetchColumns(){
        axios('https://api.fighter.hk/youtube/columns.php?exist').then(
          res => {
            this.columnQuery = res.data.columns;
          }
        )
      },
      watchHere(i){
        this.videoQuery[i].watchHere = true;
        this.$forceUpdate();
      },
      videoEmbed(url){
        var temp = 'https://www.youtube.com/embed/';
        var id = url.match(/[^v=]*$/);
        temp += id;
        return temp;
      },
      videoThumb(url){
        var id, temp;
        id = url.match(/[^v=]*$/);
        temp = 'https://img.youtube.com/vi/' + id + '/0.jpg'
        return temp;
      }
    },
    created(){
      this.fetchVideos();
      this.fetchColumns();
    }
  }
)
