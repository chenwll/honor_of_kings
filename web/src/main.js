import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/scss/style.scss'


import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css'
import './assets/iconfont/iconfont.css'

import CardComponent from "@/components/CardComponent";
import ListCard from "@/components/ListCard";

Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.component('m-card',CardComponent)
Vue.component('m-list-card',ListCard)

Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL:process.env.VUE_APP_API_URL||'/web/api',
  // baseURL:'http://localhost:3000/web/api'
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
