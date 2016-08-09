/**
 * Created by JasonChou on 16/5/23.
 */
import Promise from '../libs/promise';
import http from '../libs/http'
export  default{
  isLogin: false,
  userInfo: {},
  loginDone: new Promise,
  login(account, pwd){
    var self = this;

    return http.post({
      url: api + 'admin/login',
      jsonp: true,
      data: {
        phone: account,
        password: pwd
      }
    }).then(function (response) {
      if (response.code == 0) {
        self.userInfo = response.data;
        self.isLogin = true;
      }
    })
  },

  refresh(){
    var self = this;
    //this.loginDone = new Promise;
    var p = this.loginDone;

    http.get({
      url: api + 'admin/check',
      jsonp: true
    }).then(function (response) {
      if (response.code == 0) {
        self.userInfo = response.data.user;
        self.isLogin = true;
        p.resolve();
      } else
        p.reject();
    }).catch(function () {
      p.reject();
    })

    return p;
  },


  logout(){
    var p = new Promise;

    http.get({
      url: api + 'admin/logout',
      jsonp: true
    }).then(function (response) {
      if (response.code == 0) {
        self.userInfo = null;
        self.isLogin = false;
        p.resolve();
      } else
        p.reject();
    }).catch(function () {
      p.reject();
    })

    return p;
  }
}



