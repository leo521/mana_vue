/**
 * Created by JasonChou on 16/5/2.
 */
import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

var http = {
  loadingDalegate: null
};
var DEBUG = false;
Vue.http.interceptors.push(function () {
  return {

    request: function (request) {

      if (http.loadingDalegate)
        http.loadingDalegate.loading();
      if (DEBUG) {
        console.log("====== request start ======");
        console.log(request.url);
        console.log(request);
        console.log("====== end ======");
      }
      return request;
    },

    response: function (response) {
      if (http.loadingDalegate)
        http.loadingDalegate.loaded();
      response.code = response.data.code;
      response.msg = response.data.msg;

      if (response.data) {
        response.data = response.data.data;
      }
      if (DEBUG) {

        console.log("====== response start ======");
        console.log(response.request.url);
        console.log(response);
        console.log("====== end ======");
      }
      return response;
    }

  };
});

http.exec = function (options) {
  options.data = options.data || {};

  var method = options.method || 'get';

  if (options.jsonp == null || options.jsonp)
    return Vue.http.jsonp(options.url + '?_method=' + method, options.data).catch(function (obj) {
      if (http.loadingDalegate)
        http.loadingDalegate.toast('服务器或者本地网络异常，请重试！！');

      console.log('网络异常', obj);
    });
  else
    return Vue.http[method](options.url, options.data);
};

['post', 'put', 'get', 'delete'].forEach(function (method) {
  http[method] = function (options) {
    options.method = method;
    return http.exec(options);
  }
});


http.setLoadingDelegate = function (loadingDalegate) {
  this.loadingDalegate = loadingDalegate;
};

export default http;
