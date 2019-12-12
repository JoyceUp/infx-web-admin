import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'
 import './assets/theme-woniu/index.css'
// import './assets/theme/theme-darkblue/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
import util from './common/js/util'
import 'font-awesome/css/font-awesome.min.css'
import './assets/font/iconfont.css'
import VueI18n from 'vue-i18n'


Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });
const i18n = new VueI18n({
    locale: 'en', // 语言标识
    messages: {
        'zh': require('./common/lang/zh'),
        'en': require('./common/lang/en')
    }
})

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();

  if (to.path == '/login') {
    sessionStorage.removeItem('user');
     util.cookieMethod.delCookie('token')
  }
 // let user = JSON.parse(sessionStorage.getItem('user'));

  let token = util.cookieMethod.getCookie('token');
  if ((!token )  && to.path != '/login' ) {
    next({ path: '/login' })
  } else {
      next()
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
    i18n,
  router,
  store,

  //components: { App }
  render: h => h(App)
}).$mount('#app')

