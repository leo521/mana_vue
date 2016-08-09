/**
 * Created by leo on 16/8/8.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from './components/login.vue'
import authService from './services/authService'
import Hello from './components/Hello.vue'
import root from './components/root.vue'
import welcome from './components/welcome.vue'
import {} from './conf'

Vue.use(VueRouter);

export var router = new VueRouter();

var map = {
  '/login': {
    name: 'login',
    component: login
  },
  '/': {
    name: 'login',
    component: login
  }
};

map['/admin'] = {
  name: 'admin',
  component: root,

  subRoutes: {
    '/': {
      name: 'welcome',
      component: welcome
    },
  }
};


map['/supplier'] = {
  name: 'supplier',
  component: root,

  subRoutes: {}
};


router.map(map);

router.redirect({
  '*': '/404'
});

router.beforeEach(function ({to, next, redirect, abort}) {

  console.log(to);
  console.log(next);
  console.log(redirect);
  console.log(abort);

  var needLogin = false;
  var role = 0;
  if (to.path.match(/\/admin\/*/)) {
    needLogin = true;
    role = 1000;
  } else if (to.path.match(/\/supplier\/*/)) {
    needLogin = true;
    role = 100;
  }

  console.log(needLogin +" = needLogin");
  console.log(role + 'role');

  if (needLogin && !authService.isLogin) {

    authService.refresh().done(function () {
      if (authService.userInfo.role == role)
        next();
      else {
        if (authService.userInfo.role == 100)
          redirect({name: 'supplier'});
        else if (authService.userInfo.role == 1000)
          redirect({name: 'admin'});
        else
          abort();
      }
    }).error(function () {
      redirect({name: 'login'});
    });

    return;
  }

  next()
});
