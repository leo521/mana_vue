<template>

  <div class="loading" v-if="show">
    <img src="../../static/img/loading.gif">
  </div>

</template>

<script type="text/babel">
    export default{
      props:['show']
    }
</script>

<style scoped>

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 100;
    width: 100%;
  }

  .loading img{
    width: 100px;
  }

</style>
