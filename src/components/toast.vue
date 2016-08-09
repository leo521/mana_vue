<template>
  <div v-show="content" class="wrap">
    <div class="content"><span>{{content}}</span></div>
  </div>
</template>

<script type="text/babel">
  var toastTask;
  export default{

    data(){
      return {
        content: null,
      };
    },

    ready: function () {
      var self = this;
      this.$on('toast', function (content) {
        if (typeof content == 'object')
          self.content = JSON.stringify(content);
        else
          self.content = content;


        if (toastTask)
          clearTimeout(toastTask);

        toastTask = setTimeout(function () {
          self.content = null;
        }, 1000);
      });
    },
    methods: {}
  }
</script>

<style scoped>
  .wrap {
    position: fixed;
    z-index: 2000;
    text-align: center;
    font-size: 12px;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
  }

  .content {
    color: #fff;
    background-color: rgba(000,000,000,0.8);
    padding: 8px;
    display: inline-block;
    margin: 8px;
    word-break: break-all;
    line-height: 1.8;
    border-radius: 2px;
  }
</style>
