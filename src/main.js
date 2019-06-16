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
//消息弹框
import message from './assets/lang/message'
import axios from 'axios'
import store from './store'
import { Indicator } from 'mint-ui'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
//引入jquery
import $ from 'jquery'
//api接口
import AppConfig from './appconfig'
// 国际化
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
Vue.use(new AppConfig())
Vue.prototype.$Indicator = Indicator
require('./mock.js')
Vue.use(VueAxios, axios)
Vue.use(external)
Vue.use(message)
Vue.use(MintUI)
Vue.use(Vuex)
Vue.config.productionTip = false
/* eslint-disable no-new */
const i18n = new VueI18n({
    locale: 'zh-CN',  // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
      'zh-CN': require('./assets/lang/zh'),   // 中文语言包
      'en-US': require('./assets/lang/en')  // 英文语言包
    }
})
new Vue({
  el: '#app',
  router,
	store,
  i18n,
  components: { App },
  template: '<App/>',
})


