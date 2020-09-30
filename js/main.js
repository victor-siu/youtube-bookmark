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
      videoQuery: [], //home
      columnQuery: [], // home, submission
      logoQuery: [], //submission
      userQuery: [], //submission
      submission: { //submission
        uid: '',
        cid: '',
        url: ''
      },
      create: { //submission
        column: '',
        slug: ''
      },
      register: { //submission
        name: ''
      },
      bottomNav: 0
    },
    methods: {
      darkToggle(){
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;

        localStorage.setItem('darkMode', this.$vuetify.theme.dark);
      },
      getDarkBoolean(){
        var temp = localStorage.getItem('darkMode');
        console.log(temp);
        if ( temp !== null ) {
          this.$vuetify.theme.dark = JSON.parse(temp);
        }
      },
      fetchVideos(){
        axios('https://api.fighter.hk/youtube/videos.php').then(
          res =>{
            this.videoQuery = res.data.videos;
          }
        ).then(
          ()=>{
            this.videoQuery.forEach(video=>{
              video.watchHere = false;

              var oembed = 'https://oembed.fighter.hk/oembed?url=' + video.url + '&format=json'

              axios(oembed).then(res=>{
                video = Object.assign(video, res.data)
              }).finally(()=>this.$forceUpdate())
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
        }).then(()=>{
          this.create.column = '';
          this.create.slug = '';
          this.fetchColumns()
        })
      },
      registerNewUser(){
        var url = 'https://api.fighter.hk/youtube/newUser.php';
        axios({
          method: 'post',
          url: url,
          data: {
            userName: this.register.name
          }
        }).then(()=>{
          this.register.name = '';
          this.fetchUsers();
        })
      }
    },
    created(){
      this.getDarkBoolean(); //everywhere
      this.fetchVideos(); //home
      this.fetchColumns(); //home, submission
      this.fetchUsers(); //submission
      this.fetchLogos(); //submission
    }
  }
)
