<template>
  <div class="container-fluid main">
    <div class="login container">

      <div class="form-group">
        <h2>管理后台</h2>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">账号</label>
        <input type="tel" class="form-control" id="exampleInputEmail1" v-model="account" maxlength="11"
               placeholder="请输入手机号">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">密码</label>
        <input type="password" class="form-control" id="exampleInputPassword1" maxlength="20" v-model="password"
               placeholder="请输入密码,6-20位">
      </div>

      <div class="group">
        <button @click="login" class="btn btn-primary">登录</button>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import authService from '../services/authService';

  export default{
    data (){
      return {
        account: '',
        password: '',
      }
    },

    methods: {
      login(){
        var self = this;
        //15210837511
        authService.login(this.account, this.password).then(function (obj) {

          if (authService.isLogin) {

            self.$dispatch('toast', '登录成功！');
            if (authService.userInfo.role == 100)
              self.$route.router.replace({name: 'supplier'});
            else if (authService.userInfo.role == 1000)
              self.$route.router.replace({name: 'admin'});

          } else
            self.$dispatch('toast', '登录失败，请重试！');

          console.log(authService);
        }).catch(function (obj) {
          console.log(obj);
        });
      }
    }
  }
</script>

<style scoped>
  .body.container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .login.container {
    width: 400px;
    margin-top: -400px;
    border-radius: 4px;
  }

  .group > span {
    display: inline-block;
    width: 100px;
  }

  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
</style>
