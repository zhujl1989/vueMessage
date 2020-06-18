import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './icons'
import message from '@/plugin/index'
import upimg from '@/plugin/upimg'
Vue.config.productionTip = false
Vue.use(message)
Vue.use(upimg)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
