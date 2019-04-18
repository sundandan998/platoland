// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//element框架样式
import 'element-ui/lib/theme-chalk/index.css'
//vant框架样式
import 'vant/lib/index.css'
//各种组件集合
import external from './external-components/index'
import axios from 'axios'
import store from './store'
import { Indicator } from 'mint-ui'
import VueAxios from 'vue-axios'
//引入jquery
import $ from 'jquery'
Vue.prototype.$Indicator = Indicator
require('./mock.js')
Vue.use(VueAxios, axios)
Vue.use(external)
Vue.use(MintUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  components: { App },
  template: '<App/>'
})
