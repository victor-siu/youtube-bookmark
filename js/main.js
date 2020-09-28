var youbook = new Vue(
  {
    el: '#app',
    vuetify: new Vuetify(),
    router: new VueRouter(
      {

      }
    ),
    data: {
      theme: 'red darken-2', //all
      videoQuery: {}, //home
      columnQuery: {}, // home, submission
      logoQuery: {}, //submission
      userQuery: {}, //submission
      submission: { //submission
        uid: '',
        cid: '',
        url: ''
      },
      create: { //submission
        column: '',
        slug: ''
      },
      register: {
        name: ''
      }, //submission
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
        axios('https://api.fighter.hk/youtube/columns.php?').then(
          res => {
            this.columnQuery = res.data.columns;
          }
        )
      },
      fetchUsers(){
        axios('https://api.fighter.hk/youtube/users.php').then(
          res => {
            this.userQuery = res.data.users;
          }
        )
      },
      fetchLogos(){
        axios('https://raw.githubusercontent.com/fgnass/mdi-json/master/icons.json').then(
          res => {
            this.logoQuery = res.data;
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
      },
      submitNewVideo(){
        var url = 'https://api.fighter.hk/youtube/submission.php';
        axios({
          method: 'post',
          url: url,
          data: {
            uid: this.submission.uid,
            cid: this.submission.cid,
            url: this.submission.url
          }
        }).then(
          ()=>{
            this.submission.uid = '';
            this.submission.cid = '';
            this.submission.url = '';
          }
        )
      },
      createNewColumn(){
        var url = 'https://api.fighter.hk/youtube/newColumn.php';
        axios({
          method: 'post',
          url: url,
          data: {
            columnName: this.create.column,
            slug: this.create.slug
          }
        }).then(()=>this.fetchColumns())
      },
      registerNewUser(){
        var url = 'https://api.fighter.hk/youtube/newUser.php';
        axios({
          method: 'post',
          url: url,
          data: {
            userName: this.register.name
          }
        }).then(()=>this.fetchUsers())
      }
    },
    created(){
      this.fetchVideos(); //home
      this.fetchColumns(); //home, submission
      this.fetchUsers(); //submission
      this.fetchLogos(); //submission
    }
  }
)
