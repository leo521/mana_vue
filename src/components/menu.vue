<template>
  <ul class="nav nav-sidebar" v-for="menuGroup of menus">
    <li v-for="menu of menuGroup" :class="[ isSelected(menu)?'active':'']"><a
      v-link="menu">{{menu.title}} </a>
    </li>
  </ul>
</template>

<script type="text/babel">
  import  authService from '../services/authService'
  export default{
    data () {
      console.log(authService);
      if (authService.userInfo.role == 100)
        return {
          menus: [

          ]
        };
      else if (authService.userInfo.role == 1000)
        return {
          menus: [

          ]
        }; else

        return []
    },
    ready: function () {
    },
    methods: {

      isSelected(menu){

        if (this.$route.name == menu.name)
          return true;


        var match = this.$route.path.match(/\/admin\/(.*)/);
        if (!match)
          match = this.$route.path.match(/\/supplier\/(.*)/);

        if (match)
          var path = match[1];

        return path && path.indexOf(menu.name) == 0;
      }
    }
  }
</script>

<style scoped>
  .menu {

  }

  .logo {
    background-image: url("../../static/img/logo.jpg");
    width: 200px;
    height: 200px;
    background-size: cover;
  }

  .menu-item {
    height: 40px;
    line-height: 40px;
    color: #354947;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    cursor: pointer;
  }

  .menu-item:last-child {
  }

  .menu-item.select {
    background: #40b883;
  }
</style>
