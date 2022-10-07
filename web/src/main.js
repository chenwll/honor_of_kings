import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/scss/style.scss'


import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css'
import './assets/iconfont/iconfont.css'

import CardComponent from "@/components/CardComponent";
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.component('m-card',CardComponent)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
