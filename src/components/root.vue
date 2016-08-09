<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">管理后台</a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#">{{nickname+'|'+phone}} <span class="logout" @click="logout">登出</span></a></li>
        </ul>
        <!--<form class="navbar-form navbar-right">-->
          <!--<input type="text" class="form-control" placeholder="Search...">-->
        <!--</form>-->
      </div>
    </div>
  </nav>


  <div class="container-fluid" id="page">
    <div class="row">
      <div class="col-sm-3 col-md-2 sidebar">
        <menu></menu>
      </div>
      <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main"
           :style="{overflow:dialogCount<=0?'auto':'hidden'}">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script type="text/babel">
  import menu from './menu.vue'
  import authService from '../services/authService'

  export default{
    components: {
      menu
    },

    data (){
      return {
        nickname: '',
        phone: '',
        dialogCount: 0

      };
    },
    ready: function () {
      var self = this;

      authService.loginDone.done(
        function () {
          self.nickname = authService.userInfo.nickname;
          self.phone = authService.userInfo.phone;
        });
    },
    methods: {
      logout(){
        var self = this;
        authService.logout().done(function () {
          self.$route.router.go({name: 'login'});
        });
      }
    },
    events: {
      dialogShowed(){
        this.dialogCount++;
      },

      dialogHidden(){
        if (this.dialogCount == 0)
          return console.log('dialog数量异常');
        this.dialogCount--;
      }
    }
  }
</script>

<style scoped>
</style>
