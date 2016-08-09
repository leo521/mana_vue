<template>
  <div id="app">
    <toast></toast>

    <router-view></router-view>

    <loading :show.sync="load"></loading>
  </div>

</template>

<script>
  import toast from './components/toast.vue'
  import loading from './components/loading.vue'
  import http from './libs/http'

  export default {
    components: {
      loading, toast
    },

    data(){
      return {
        load: false
      }
    },

    route: {
      data(transition){
        setTimeout(function () {
          transition.next();

        }, 2000);
      }
    },

    ready(){
      var self = this;
      http.setLoadingDelegate(this);
      this.$on('toast', function (content) {
        self.$broadcast('toast', content);
      });
    },

    methods: {
      loading(){
        this.load = true;
      }, loaded(){
        this.load = false;
      }, toast(msg){
        console.log(msg);
        this.$emit('toast', msg);
      }
    }
  }
</script>

<style>
  @import "../static/css/app.less";
</style>
