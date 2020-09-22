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
      columnQuery: {},
      current: ''
    },
    computed: {
    },
    methods: {
      fetchVideos(){
        axios('https://api.fighter.hk/youtube/videos.php').then(
          res =>{
            this.videoQuery = res.data.videos;
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
      videoEmbed(url){
        var temp = 'https://www.youtube.com/embed/';
        var id = url.match(/[^v=]*$/);
        temp += id;
        console.error(temp);
        return temp;
      },
      videoThumb(url){
        var id, temp;
        id = url.match(/[^v=]*$/);
        temp = 'https://img.youtube.com/vi/' + id + '/0.jpg'
        return temp;
      }
    },
    mounted(){
      this.fetchVideos();
      this.fetchColumns();
    }
  }
)
